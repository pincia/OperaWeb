using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using OperaWeb.Server.Abstractions;
using OperaWeb.Server.DataClasses.Context;
using OperaWeb.Server.DataClasses.Models;
using OperaWeb.Server.DataClasses;
using OperaWeb.Server.Services;
using Services.UserGroup;
using System.Text;
using Microsoft.AspNetCore.Identity.UI.Services;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("OperaWebConnectionString");

// Add context
builder.Services.AddDbContext<OperaWebDbContext>(options =>
    options.UseSqlServer(connectionString, x => x.MigrationsAssembly("OperaWeb.Server.DataClasses")));

// Add services to the container.

var appSetttings = builder.Configuration.GetSection("AppSettings").Get<AppSettings>() ?? new AppSettings();
builder.Services.AddSingleton(appSetttings);
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<OperaWebDbContextInitialiser>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(config =>
{
  config.SwaggerDoc("v1", new OpenApiInfo() { Title = "App Api", Version = "v1" });
  config.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
  {
    In = ParameterLocation.Header,
    Description = "Please enter token",
    Name = "Authorization",
    Type = SecuritySchemeType.Http,
    BearerFormat = "JWT",
    Scheme = "bearer"
  });
  config.AddSecurityRequirement(new OpenApiSecurityRequirement{
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type=ReferenceType.SecurityScheme,
                                Id="Bearer"
                            }
                        },
                        new string[]{}
                    }
                });
});
builder.Services.AddIdentityCore<ApplicationUser>(options =>
{
  options.SignIn.RequireConfirmedEmail = true;
})
   .AddRoles<IdentityRole>()
        .AddSignInManager()
        .AddEntityFrameworkStores<OperaWebDbContext>()
        .AddTokenProvider<DataProtectorTokenProvider<ApplicationUser>>("APP");

builder.Services.AddScoped<IProjectService, ProjectService>();
//Email sender service
builder.Services.AddTransient<IEmailSender, EmailSender>();


//Add auto mapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.Configure<DataProtectionTokenProviderOptions>(options =>
{
  options.TokenLifespan = TimeSpan.FromSeconds(appSetttings.RefreshTokenExpireSeconds);
});

builder.Services.AddLogging(logs =>
{
  logs.AddConsole();
  logs.AddAzureWebAppDiagnostics();
});

builder.Services.AddAuthentication(options =>
{
  options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
  options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
      options.RequireHttpsMetadata = false;
      options.SaveToken = true;
      options.TokenValidationParameters = new TokenValidationParameters
      {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        RequireExpirationTime = true,
        ValidIssuer = appSetttings.Issuer,
        ValidAudience = appSetttings.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSetttings.SecretKey)),
        ClockSkew = TimeSpan.FromSeconds(0)
      };
    });
builder.Services.AddScoped<OperaWebDbContextInitialiser>();
builder.Services.AddTransient<UserService>();
builder.Services.AddCors(options =>
{
  options.AddPolicy("webAppRequests", builder =>
  {
    builder.AllowAnyHeader()
    .AllowAnyMethod()
    .WithOrigins(appSetttings.Audience)
    .AllowCredentials();
  });
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
  app.UseDeveloperExceptionPage();
  InitializeDb(app);

}

app.UseCors(policy =>
policy
.AllowAnyOrigin()
.AllowAnyHeader()
.AllowAnyMethod()
);

app.UseHttpsRedirection();


//https://referbruv.com/blog/building-custom-responses-for-unauthorized-requests-in-aspnet-core/
app.Use(async (context, next) =>
{
  await next();

  if (context.Response.StatusCode == (int)System.Net.HttpStatusCode.Unauthorized)
  {
    await context.Response.WriteAsync("Token Validation Has Failed. Request Access Denied");
  }
});

app.UseAuthentication();
app.UseAuthorization();
app.MapFallbackToFile("/index.html");

app.MapControllers();

app.Run();


static async void InitializeDb(WebApplication app)
{
  using (var scope = app.Services.CreateScope())
  {
    var initialiser = scope.ServiceProvider.GetRequiredService<OperaWebDbContextInitialiser>();
    await initialiser.InitialiseAsync();
    await initialiser.SeedAsync();
  }
}

