using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OperaWeb.Server.DataClasses.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AccessLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Action = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IPAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserAgent = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Success = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccessLogs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Figures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Figures", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OrganizationRoles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ParentRoleId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationRoles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrganizationRoles_OrganizationRoles_ParentRoleId",
                        column: x => x.ParentRoleId,
                        principalTable: "OrganizationRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProjectSubjectRoles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectSubjectRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Province",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sigla = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Province", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Soa",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Soa", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SoaClassifications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SoaClassifications", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SubFigures",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubFigures", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Templates",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Codice = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Descrizione = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImagePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    JsonTemplate = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Templates", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FigureOrganizationRoleMappings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FigureId = table.Column<int>(type: "int", nullable: false),
                    OrganizationRoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FigureOrganizationRoleMappings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FigureOrganizationRoleMappings_Figures_FigureId",
                        column: x => x.FigureId,
                        principalTable: "Figures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FigureOrganizationRoleMappings_OrganizationRoles_OrganizationRoleId",
                        column: x => x.OrganizationRoleId,
                        principalTable: "OrganizationRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FigureProjectSubjectRoles",
                columns: table => new
                {
                    FigureId = table.Column<int>(type: "int", nullable: false),
                    ProjectSubjectRoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FigureProjectSubjectRoles", x => new { x.FigureId, x.ProjectSubjectRoleId });
                    table.ForeignKey(
                        name: "FK_FigureProjectSubjectRoles_Figures_FigureId",
                        column: x => x.FigureId,
                        principalTable: "Figures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FigureProjectSubjectRoles_ProjectSubjectRoles_ProjectSubjectRoleId",
                        column: x => x.ProjectSubjectRoleId,
                        principalTable: "ProjectSubjectRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Comuni",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProvinciaId = table.Column<int>(type: "int", nullable: false),
                    SiglaProvincia = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comuni", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comuni_Province_ProvinciaId",
                        column: x => x.ProvinciaId,
                        principalTable: "Province",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FigureSubFigures",
                columns: table => new
                {
                    FigureId = table.Column<int>(type: "int", nullable: false),
                    SubFigureId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FigureSubFigures", x => new { x.FigureId, x.SubFigureId });
                    table.ForeignKey(
                        name: "FK_FigureSubFigures_Figures_FigureId",
                        column: x => x.FigureId,
                        principalTable: "Figures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FigureSubFigures_SubFigures_SubFigureId",
                        column: x => x.SubFigureId,
                        principalTable: "SubFigures",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    VatOrTaxCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ComuneId = table.Column<int>(type: "int", nullable: true),
                    ProvinciaId = table.Column<int>(type: "int", nullable: true),
                    PostalCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Website = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    SDICode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    PEC = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CompanyType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    FigureId = table.Column<int>(type: "int", nullable: false),
                    SubFigureId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Companies_Comuni_ComuneId",
                        column: x => x.ComuneId,
                        principalTable: "Comuni",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Companies_Figures_FigureId",
                        column: x => x.FigureId,
                        principalTable: "Figures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Companies_Province_ProvinciaId",
                        column: x => x.ProvinciaId,
                        principalTable: "Province",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Companies_SubFigures_SubFigureId",
                        column: x => x.SubFigureId,
                        principalTable: "SubFigures",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    VerificationToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VerifiedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ResetToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ResetTokenExpiresAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PasswordReset = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ComuneId = table.Column<int>(type: "int", nullable: true),
                    ProvinciaId = table.Column<int>(type: "int", nullable: true),
                    SubRoleId = table.Column<int>(type: "int", nullable: true),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MobileNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AlternateEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PostalCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TaxCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CompanyId = table.Column<int>(type: "int", nullable: true),
                    MustChangePassword = table.Column<bool>(type: "bit", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUsers_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AspNetUsers_Comuni_ComuneId",
                        column: x => x.ComuneId,
                        principalTable: "Comuni",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AspNetUsers_Province_ProvinciaId",
                        column: x => x.ProvinciaId,
                        principalTable: "Province",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AspNetUsers_SubFigures_SubRoleId",
                        column: x => x.SubRoleId,
                        principalTable: "SubFigures",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsRead = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Link = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notifications_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OrganizationMembers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: true),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    IsOwner = table.Column<bool>(type: "bit", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationMembers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrganizationMembers_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_OrganizationMembers_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OrganizationMembers_OrganizationRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "OrganizationRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Object = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Province = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Works = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Public = table.Column<bool>(type: "bit", nullable: false),
                    CompleteAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Latitude = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Longitude = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    GIG = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    CUP = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastUpdateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeleteDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SoaCategoryId = table.Column<int>(type: "int", nullable: true),
                    SoaClassificationId = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Projects_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Projects_SoaClassifications_SoaClassificationId",
                        column: x => x.SoaClassificationId,
                        principalTable: "SoaClassifications",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Projects_Soa_SoaCategoryId",
                        column: x => x.SoaCategoryId,
                        principalTable: "Soa",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserSubRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SubRoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSubRoles", x => new { x.UserId, x.SubRoleId });
                    table.ForeignKey(
                        name: "FK_UserSubRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserSubRoles_SubFigures_SubRoleId",
                        column: x => x.SubRoleId,
                        principalTable: "SubFigures",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Analisi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SpeseUtili = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SpeseGenerali = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    UtiliImpresa = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    OneriAccessoriSc = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ConfQuantita = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Metodo = table.Column<int>(type: "int", nullable: false),
                    ApplicataA = table.Column<int>(type: "int", nullable: false),
                    ProjectID = table.Column<int>(type: "int", nullable: true),
                    IsDefault = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Analisi", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Analisi_Projects_ProjectID",
                        column: x => x.ProjectID,
                        principalTable: "Projects",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ConfigNumeri",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Valuta = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PartiUguali = table.Column<int>(type: "int", nullable: false),
                    Lunghezza = table.Column<int>(type: "int", nullable: false),
                    Larghezza = table.Column<int>(type: "int", nullable: false),
                    HPeso = table.Column<int>(type: "int", nullable: false),
                    Quantita = table.Column<int>(type: "int", nullable: false),
                    Prezzi = table.Column<int>(type: "int", nullable: false),
                    PrezziTotale = table.Column<int>(type: "int", nullable: false),
                    ConvPrezzi = table.Column<int>(type: "int", nullable: false),
                    ConvPrezziTotale = table.Column<int>(type: "int", nullable: false),
                    IncidenzaPercentuale = table.Column<int>(type: "int", nullable: false),
                    Aliquote = table.Column<int>(type: "int", nullable: false),
                    ProjectID = table.Column<int>(type: "int", nullable: true),
                    IsDefault = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfigNumeri", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ConfigNumeri_Projects_ProjectID",
                        column: x => x.ProjectID,
                        principalTable: "Projects",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DatiGenerali",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PercPrezzi = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Comune = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Provincia = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Oggetto = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Committente = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Impresa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ParteOpera = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DatiGenerali", x => x.ID);
                    table.ForeignKey(
                        name: "FK_DatiGenerali_Projects_ProjectID",
                        column: x => x.ProjectID,
                        principalTable: "Projects",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Economics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MeasuredWorks = table.Column<decimal>(type: "decimal(18,2)", nullable: false, comment: "Importo dei lavori a misura"),
                    LumpSumWorks = table.Column<decimal>(type: "decimal(18,2)", nullable: false, comment: "Importo dei lavori a corpo"),
                    SafetyCosts = table.Column<decimal>(type: "decimal(18,2)", nullable: false, comment: "Costi della sicurezza"),
                    LaborCosts = table.Column<decimal>(type: "decimal(18,2)", nullable: false, comment: "Costi della manodopera"),
                    AuctionVariationPercentage = table.Column<decimal>(type: "decimal(18,2)", nullable: false, comment: "Percentuale variazione d'asta"),
                    AvailableSums = table.Column<decimal>(type: "decimal(18,2)", nullable: false, comment: "Somme a disposizione"),
                    TotalProjectCalculationType = table.Column<string>(type: "nvarchar(max)", nullable: false, comment: "Tipo di calcolo del totale progetto"),
                    ProjectId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Economics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Economics_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ElencoPrezzi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IDEP = table.Column<int>(type: "int", nullable: false),
                    TipoEP = table.Column<int>(type: "int", nullable: false),
                    Tariffa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Articolo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DesRidotta = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DesEstesa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DesBreve = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UnMisura = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prezzo1 = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Prezzo2 = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Prezzo3 = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Prezzo4 = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Prezzo5 = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SuperCapID = table.Column<int>(type: "int", nullable: true),
                    CapID = table.Column<int>(type: "int", nullable: false),
                    SubCapID = table.Column<int>(type: "int", nullable: false),
                    Flags = table.Column<int>(type: "int", nullable: false),
                    Data = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AdrInternet = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PweEPAnalisi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProjectID = table.Column<int>(type: "int", nullable: false),
                    Manodopera = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ElencoPrezzi", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ElencoPrezzi_Projects_ProjectID",
                        column: x => x.ProjectID,
                        principalTable: "Projects",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Invitations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    RecipientEmail = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Token = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Cf = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    SentDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AcceptedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeclinedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ExpirationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ProjectId = table.Column<int>(type: "int", nullable: false),
                    InvitedByUserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invitations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Invitations_AspNetUsers_InvitedByUserId",
                        column: x => x.InvitedByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Invitations_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectResourceTeamType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectId = table.Column<int>(type: "int", nullable: false),
                    SpecializedQuantity = table.Column<int>(type: "int", nullable: false),
                    SpecializedHourlyRate = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    QualifiedQuantity = table.Column<int>(type: "int", nullable: false),
                    QualifiedHourlyRate = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CommonQuantity = table.Column<int>(type: "int", nullable: false),
                    CommonHourlyRate = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    IsDefault = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectResourceTeamType", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectResourceTeamType_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProjectTasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Duration = table.Column<int>(type: "int", nullable: false),
                    Progress = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ParentId = table.Column<int>(type: "int", nullable: true),
                    ProjectId = table.Column<int>(type: "int", nullable: false),
                    Priority = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectTasks_ProjectTasks_ParentId",
                        column: x => x.ParentId,
                        principalTable: "ProjectTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ProjectTasks_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SuperCategorie",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExternalID = table.Column<int>(type: "int", nullable: false),
                    DesSintetica = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DesEstesa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DataInit = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Durata = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CodFase = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Percentuale = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Codice = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    JobType = table.Column<int>(type: "int", nullable: false),
                    ProjectID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SuperCategorie", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SuperCategorie_Projects_ProjectID",
                        column: x => x.ProjectID,
                        principalTable: "Projects",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserProjectAccess",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProjectId = table.Column<int>(type: "int", nullable: false),
                    LastAccessed = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProjectAccess", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserProjectAccess_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserProjectAccess_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "ProjectSubjects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectId = table.Column<int>(type: "int", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InvitationId = table.Column<int>(type: "int", nullable: true),
                    ProjectSubjectRoleId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Company = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectSubjects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectSubjects_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ProjectSubjects_Invitations_InvitationId",
                        column: x => x.InvitationId,
                        principalTable: "Invitations",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ProjectSubjects_ProjectSubjectRoles_ProjectSubjectRoleId",
                        column: x => x.ProjectSubjectRoleId,
                        principalTable: "ProjectSubjectRoles",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ProjectSubjects_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Configuration",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AnalisiId = table.Column<int>(type: "int", nullable: false),
                    ConfigNumeriId = table.Column<int>(type: "int", nullable: false),
                    ProjectResourceTeamTypeId = table.Column<int>(type: "int", nullable: false),
                    ApplicationUserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Configuration", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Configuration_Analisi_AnalisiId",
                        column: x => x.AnalisiId,
                        principalTable: "Analisi",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Configuration_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Configuration_ConfigNumeri_ConfigNumeriId",
                        column: x => x.ConfigNumeriId,
                        principalTable: "ConfigNumeri",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Configuration_ProjectResourceTeamType_ProjectResourceTeamTypeId",
                        column: x => x.ProjectResourceTeamTypeId,
                        principalTable: "ProjectResourceTeamType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Categorie",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExternalID = table.Column<int>(type: "int", nullable: false),
                    DesSintetica = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DesEstesa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DataInit = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Durata = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CodFase = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Percentuale = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Codice = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectID = table.Column<int>(type: "int", nullable: false),
                    SuperCategoriaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categorie", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Categorie_Projects_ProjectID",
                        column: x => x.ProjectID,
                        principalTable: "Projects",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Categorie_SuperCategorie_SuperCategoriaId",
                        column: x => x.SuperCategoriaId,
                        principalTable: "SuperCategorie",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "SubCategorie",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExternalID = table.Column<int>(type: "int", nullable: false),
                    DesSintetica = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DesEstesa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DataInit = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Durata = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CodFase = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Percentuale = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Codice = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectID = table.Column<int>(type: "int", nullable: false),
                    CategoriaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubCategorie", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SubCategorie_Categorie_CategoriaId",
                        column: x => x.CategoriaId,
                        principalTable: "Categorie",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_SubCategorie_Projects_ProjectID",
                        column: x => x.ProjectID,
                        principalTable: "Projects",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "VociComputo",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ElencoPrezzoID = table.Column<int>(type: "int", nullable: false),
                    Quantita = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DataMis = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Flags = table.Column<int>(type: "int", nullable: false),
                    Prezzo = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SuperCategoriaID = table.Column<int>(type: "int", nullable: true),
                    CategoriaID = table.Column<int>(type: "int", nullable: true),
                    SubCategoriaID = table.Column<int>(type: "int", nullable: true),
                    ProjectID = table.Column<int>(type: "int", nullable: false),
                    JobType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VociComputo", x => x.ID);
                    table.ForeignKey(
                        name: "FK_VociComputo_Categorie_CategoriaID",
                        column: x => x.CategoriaID,
                        principalTable: "Categorie",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_VociComputo_ElencoPrezzi_ElencoPrezzoID",
                        column: x => x.ElencoPrezzoID,
                        principalTable: "ElencoPrezzi",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VociComputo_Projects_ProjectID",
                        column: x => x.ProjectID,
                        principalTable: "Projects",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_VociComputo_SubCategorie_SubCategoriaID",
                        column: x => x.SubCategoriaID,
                        principalTable: "SubCategorie",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_VociComputo_SuperCategorie_SuperCategoriaID",
                        column: x => x.SuperCategoriaID,
                        principalTable: "SuperCategorie",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Misure",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IDVV = table.Column<int>(type: "int", nullable: false),
                    Descrizione = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PartiUguali = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Lunghezza = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Larghezza = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    HPeso = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Quantita = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Flags = table.Column<int>(type: "int", nullable: false),
                    VoceComputoID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Misure", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Misure_VociComputo_VoceComputoID",
                        column: x => x.VoceComputoID,
                        principalTable: "VociComputo",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Analisi_ProjectID",
                table: "Analisi",
                column: "ProjectID",
                unique: true,
                filter: "[ProjectID] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_CompanyId",
                table: "AspNetUsers",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_ComuneId",
                table: "AspNetUsers",
                column: "ComuneId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_ProvinciaId",
                table: "AspNetUsers",
                column: "ProvinciaId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_SubRoleId",
                table: "AspNetUsers",
                column: "SubRoleId");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Categorie_ProjectID",
                table: "Categorie",
                column: "ProjectID");

            migrationBuilder.CreateIndex(
                name: "IX_Categorie_SuperCategoriaId",
                table: "Categorie",
                column: "SuperCategoriaId");

            migrationBuilder.CreateIndex(
                name: "IX_Companies_ComuneId",
                table: "Companies",
                column: "ComuneId");

            migrationBuilder.CreateIndex(
                name: "IX_Companies_FigureId",
                table: "Companies",
                column: "FigureId");

            migrationBuilder.CreateIndex(
                name: "IX_Companies_ProvinciaId",
                table: "Companies",
                column: "ProvinciaId");

            migrationBuilder.CreateIndex(
                name: "IX_Companies_SubFigureId",
                table: "Companies",
                column: "SubFigureId");

            migrationBuilder.CreateIndex(
                name: "IX_Comuni_ProvinciaId",
                table: "Comuni",
                column: "ProvinciaId");

            migrationBuilder.CreateIndex(
                name: "IX_ConfigNumeri_ProjectID",
                table: "ConfigNumeri",
                column: "ProjectID",
                unique: true,
                filter: "[ProjectID] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Configuration_AnalisiId",
                table: "Configuration",
                column: "AnalisiId");

            migrationBuilder.CreateIndex(
                name: "IX_Configuration_ApplicationUserId",
                table: "Configuration",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Configuration_ConfigNumeriId",
                table: "Configuration",
                column: "ConfigNumeriId");

            migrationBuilder.CreateIndex(
                name: "IX_Configuration_ProjectResourceTeamTypeId",
                table: "Configuration",
                column: "ProjectResourceTeamTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_DatiGenerali_ProjectID",
                table: "DatiGenerali",
                column: "ProjectID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Economics_ProjectId",
                table: "Economics",
                column: "ProjectId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ElencoPrezzi_ProjectID",
                table: "ElencoPrezzi",
                column: "ProjectID");

            migrationBuilder.CreateIndex(
                name: "IX_FigureOrganizationRoleMappings_FigureId",
                table: "FigureOrganizationRoleMappings",
                column: "FigureId");

            migrationBuilder.CreateIndex(
                name: "IX_FigureOrganizationRoleMappings_OrganizationRoleId",
                table: "FigureOrganizationRoleMappings",
                column: "OrganizationRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_FigureProjectSubjectRoles_ProjectSubjectRoleId",
                table: "FigureProjectSubjectRoles",
                column: "ProjectSubjectRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_FigureSubFigures_SubFigureId",
                table: "FigureSubFigures",
                column: "SubFigureId");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_InvitedByUserId",
                table: "Invitations",
                column: "InvitedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_ProjectId",
                table: "Invitations",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Misure_VoceComputoID",
                table: "Misure",
                column: "VoceComputoID");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserId",
                table: "Notifications",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationMembers_CompanyId",
                table: "OrganizationMembers",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationMembers_RoleId",
                table: "OrganizationMembers",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationMembers_UserId",
                table: "OrganizationMembers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationRoles_ParentRoleId",
                table: "OrganizationRoles",
                column: "ParentRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectResourceTeamType_ProjectId",
                table: "ProjectResourceTeamType",
                column: "ProjectId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Projects_SoaCategoryId",
                table: "Projects",
                column: "SoaCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_SoaClassificationId",
                table: "Projects",
                column: "SoaClassificationId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_UserId",
                table: "Projects",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectSubjects_InvitationId",
                table: "ProjectSubjects",
                column: "InvitationId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectSubjects_ProjectId",
                table: "ProjectSubjects",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectSubjects_ProjectSubjectRoleId",
                table: "ProjectSubjects",
                column: "ProjectSubjectRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectSubjects_UserId",
                table: "ProjectSubjects",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTasks_ParentId",
                table: "ProjectTasks",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTasks_ProjectId",
                table: "ProjectTasks",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_SubCategorie_CategoriaId",
                table: "SubCategorie",
                column: "CategoriaId");

            migrationBuilder.CreateIndex(
                name: "IX_SubCategorie_ProjectID",
                table: "SubCategorie",
                column: "ProjectID");

            migrationBuilder.CreateIndex(
                name: "IX_SuperCategorie_ProjectID",
                table: "SuperCategorie",
                column: "ProjectID");

            migrationBuilder.CreateIndex(
                name: "IX_UserProjectAccess_ProjectId",
                table: "UserProjectAccess",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProjectAccess_UserId",
                table: "UserProjectAccess",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSubRoles_SubRoleId",
                table: "UserSubRoles",
                column: "SubRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_VociComputo_CategoriaID",
                table: "VociComputo",
                column: "CategoriaID");

            migrationBuilder.CreateIndex(
                name: "IX_VociComputo_ElencoPrezzoID",
                table: "VociComputo",
                column: "ElencoPrezzoID");

            migrationBuilder.CreateIndex(
                name: "IX_VociComputo_ProjectID",
                table: "VociComputo",
                column: "ProjectID");

            migrationBuilder.CreateIndex(
                name: "IX_VociComputo_SubCategoriaID",
                table: "VociComputo",
                column: "SubCategoriaID");

            migrationBuilder.CreateIndex(
                name: "IX_VociComputo_SuperCategoriaID",
                table: "VociComputo",
                column: "SuperCategoriaID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccessLogs");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Configuration");

            migrationBuilder.DropTable(
                name: "DatiGenerali");

            migrationBuilder.DropTable(
                name: "Economics");

            migrationBuilder.DropTable(
                name: "FigureOrganizationRoleMappings");

            migrationBuilder.DropTable(
                name: "FigureProjectSubjectRoles");

            migrationBuilder.DropTable(
                name: "FigureSubFigures");

            migrationBuilder.DropTable(
                name: "Misure");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "OrganizationMembers");

            migrationBuilder.DropTable(
                name: "ProjectSubjects");

            migrationBuilder.DropTable(
                name: "ProjectTasks");

            migrationBuilder.DropTable(
                name: "Templates");

            migrationBuilder.DropTable(
                name: "UserProjectAccess");

            migrationBuilder.DropTable(
                name: "UserSubRoles");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Analisi");

            migrationBuilder.DropTable(
                name: "ConfigNumeri");

            migrationBuilder.DropTable(
                name: "ProjectResourceTeamType");

            migrationBuilder.DropTable(
                name: "VociComputo");

            migrationBuilder.DropTable(
                name: "OrganizationRoles");

            migrationBuilder.DropTable(
                name: "Invitations");

            migrationBuilder.DropTable(
                name: "ProjectSubjectRoles");

            migrationBuilder.DropTable(
                name: "ElencoPrezzi");

            migrationBuilder.DropTable(
                name: "SubCategorie");

            migrationBuilder.DropTable(
                name: "Categorie");

            migrationBuilder.DropTable(
                name: "SuperCategorie");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "SoaClassifications");

            migrationBuilder.DropTable(
                name: "Soa");

            migrationBuilder.DropTable(
                name: "Companies");

            migrationBuilder.DropTable(
                name: "Comuni");

            migrationBuilder.DropTable(
                name: "Figures");

            migrationBuilder.DropTable(
                name: "SubFigures");

            migrationBuilder.DropTable(
                name: "Province");
        }
    }
}
