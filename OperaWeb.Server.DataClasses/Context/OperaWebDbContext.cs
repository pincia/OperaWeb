using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using OperaWeb.Server.DataClasses.Models;
using OperaWeb.Server.DataClasses.Models.User;
using OperaWeb.Server.Models;
using AccessLog = OperaWeb.Server.DataClasses.Models.AccessLog;

namespace OperaWeb.Server.DataClasses.Context
{
    public class OperaWebDbContext : IdentityDbContext<ApplicationUser>
  {
    public virtual DbSet<Configuration> Configuration { get; set; }
    public virtual DbSet<Invitation> Invitations { get; set; }
    public virtual DbSet <ProjectResourceTeamType> ResourceTeamTypes { get; set; }
    public virtual DbSet<Figure> Figures { get; set; }
    public virtual DbSet<Company> Companies { get; set; }
    public virtual DbSet<Economics> Economics { get; set; }
    public virtual DbSet<SubFigure> SubFigures { get; set; }
    public virtual DbSet<AccessLog> AccessLogs { get; set; }
    public virtual DbSet<OrganizationRole> OrganizationRoles { get; set; }
    public virtual DbSet<OrganizationMember> OrganizationMembers { get; set; }
    public virtual DbSet<Comune> Comuni { get; set; }
    public virtual DbSet<Provincia> Province { get; set; }
    public virtual DbSet<UserProjectAccess> UserProjectAccess { get; set; }
    public virtual DbSet<UserSubRole> UserSubRoles { get; set; }
    public virtual DbSet<FigureSubFigure> FigureSubFigures { get; set; }
    public virtual DbSet<ProjectSubjectRole> ProjectSubjectRoles { get; set; }
    public virtual DbSet<FigureProjectSubjectRole> FigureProjectSubjectRoles { get; set; }
    public virtual DbSet<Notification> Notifications { get; set; }
    public virtual DbSet<Categoria> Categorie { get; set; }
    public virtual DbSet<SubCategoria> SubCategorie { get; set; }
    public virtual DbSet<SuperCategoria> SuperCategorie { get; set; }
    public virtual DbSet<Analisi> Analisi { get; set; }
    public virtual DbSet<ConfigNumeri> ConfigNumeri { get; set; }
    public virtual DbSet<ElencoPrezzo> ElencoPrezzi { get; set; }
    public virtual DbSet<VoceComputo> VociComputo { get; set; }
    public virtual DbSet<Misura> Misure { get; set; }
    public virtual DbSet<Project> Projects { get; set; }
    public virtual DbSet<Template> Templates { get; set; }
    public virtual DbSet<ProjectSubject> ProjectSubjects { get; set; }
    public virtual DbSet<Soa> Soas { get; set; }
    public virtual DbSet<SoaClassification> SoaClassifications { get; set; }
    public virtual DbSet<Models.ProjectTask> ProjectTasks { get; set; }
    public virtual DbSet<FigureOrganizationRoleMapping> FigureOrganizationRoleMappings { get; set; }
    public virtual DbSet<ProjectResourceTeamType> ProjectResourceTeamTypes { get; set; }
    public virtual DbSet<DatiGenerali> DatiGenerali { get; set; }

    private readonly IConfiguration _configuration;

    public OperaWebDbContext(DbContextOptions<OperaWebDbContext> options, IConfiguration configuration)
    {
      _configuration = configuration;
    }
    // <summary>
    /// Configura il modello utilizzando Fluent API.
    /// </summary>
    /// <param name="modelBuilder">Il costruttore del modello.</param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      // Applica tutte le configurazioni di entità
      modelBuilder.ApplyConfigurationsFromAssembly(typeof(OperaWebDbContext).Assembly);
    }

    /// <summary>
    /// Configura il contesto del database.
    /// </summary>
    /// <param name="optionsBuilder">Il costruttore delle opzioni del contesto.</param>
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      if (!optionsBuilder.IsConfigured)
      {
        // Recupera la stringa di connessione da appsettings.json
        var connectionString = _configuration.GetConnectionString("OperaWebConnectionString");

        optionsBuilder.UseSqlServer(connectionString, options =>
        {
          options.CommandTimeout(300); // Timeout in secondi
        });
      }
    }

  }
}
