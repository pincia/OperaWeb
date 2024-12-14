using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OperaWeb.Server.DataClasses.Migrations
{
    /// <inheritdoc />
    public partial class FirstMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    VerificationToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VerifiedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ResetToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ResetTokenExpiresAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PasswordReset = table.Column<DateTime>(type: "datetime2", nullable: true),
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
                name: "SubRoles",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubRoles", x => x.ID);
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
                name: "Files",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Files", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Files_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                        name: "FK_UserSubRoles_SubRoles_SubRoleId",
                        column: x => x.SubRoleId,
                        principalTable: "SubRoles",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
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
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    GIG = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    CUP = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastUpdateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FileID = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    SoaCategoryId = table.Column<int>(type: "int", nullable: true),
                    SoaClassificationId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Projects_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Projects_Files_FileID",
                        column: x => x.FileID,
                        principalTable: "Files",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
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
                name: "Analisi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SpeseUtili = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SpeseGenerali = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    UtiliImpresa = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    OneriAccessoriSc = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ConfQuantita = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Analisi", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Analisi_Projects_ProjectID",
                        column: x => x.ProjectID,
                        principalTable: "Projects",
                        principalColumn: "ID",
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
                    ProjectID1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categorie", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Categorie_Projects_ProjectID",
                        column: x => x.ProjectID,
                        principalTable: "Projects",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Categorie_Projects_ProjectID1",
                        column: x => x.ProjectID1,
                        principalTable: "Projects",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "ConfigNumeri",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Divisa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ConversioniIN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FattoreConversione = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cambio = table.Column<byte>(type: "tinyint", nullable: false),
                    PartiUguali = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Lunghezza = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Larghezza = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HPeso = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Quantita = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Prezzi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PrezziTotale = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ConvPrezzi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ConvPrezziTotale = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IncidenzaPercentuale = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Aliquote = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfigNumeri", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ConfigNumeri_Projects_ProjectID",
                        column: x => x.ProjectID,
                        principalTable: "Projects",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
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
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ElencoPrezzi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IDEP = table.Column<int>(type: "int", nullable: false),
                    TipoEP = table.Column<int>(type: "int", nullable: false),
                    Tariffa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Articolo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DesRidotta = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DesEstesa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DesBreve = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UnMisura = table.Column<string>(type: "nvarchar(max)", nullable: false),
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
                    AdrInternet = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PweEPAnalisi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ElencoPrezzi", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ElencoPrezzi_Projects_ProjectID",
                        column: x => x.ProjectID,
                        principalTable: "Projects",
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
                    ProjectID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubCategorie", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SubCategorie_Projects_ProjectID",
                        column: x => x.ProjectID,
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
                        onDelete: ReferentialAction.Cascade);
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
                    SuperCategoriaID = table.Column<int>(type: "int", nullable: true),
                    CategoriaID1 = table.Column<int>(type: "int", nullable: false),
                    SubCategoriaID = table.Column<int>(type: "int", nullable: true),
                    ProjectID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VociComputo", x => x.ID);
                    table.ForeignKey(
                        name: "FK_VociComputo_Categorie_CategoriaID1",
                        column: x => x.CategoriaID1,
                        principalTable: "Categorie",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
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
                        principalColumn: "ID");
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
                    PartiUguali = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                column: "ProjectID");

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
                name: "IX_Categorie_ProjectID1",
                table: "Categorie",
                column: "ProjectID1");

            migrationBuilder.CreateIndex(
                name: "IX_ConfigNumeri_ProjectID",
                table: "ConfigNumeri",
                column: "ProjectID");

            migrationBuilder.CreateIndex(
                name: "IX_DatiGenerali_ProjectID",
                table: "DatiGenerali",
                column: "ProjectID");

            migrationBuilder.CreateIndex(
                name: "IX_ElencoPrezzi_ProjectID",
                table: "ElencoPrezzi",
                column: "ProjectID");

            migrationBuilder.CreateIndex(
                name: "IX_Files_UserId",
                table: "Files",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Misure_VoceComputoID",
                table: "Misure",
                column: "VoceComputoID");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_FileID",
                table: "Projects",
                column: "FileID");

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
                name: "IX_SubCategorie_ProjectID",
                table: "SubCategorie",
                column: "ProjectID");

            migrationBuilder.CreateIndex(
                name: "IX_SuperCategorie_ProjectID",
                table: "SuperCategorie",
                column: "ProjectID");

            migrationBuilder.CreateIndex(
                name: "IX_UserSubRoles_SubRoleId",
                table: "UserSubRoles",
                column: "SubRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_VociComputo_CategoriaID1",
                table: "VociComputo",
                column: "CategoriaID1");

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
                name: "Analisi");

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
                name: "ConfigNumeri");

            migrationBuilder.DropTable(
                name: "DatiGenerali");

            migrationBuilder.DropTable(
                name: "Misure");

            migrationBuilder.DropTable(
                name: "Templates");

            migrationBuilder.DropTable(
                name: "UserSubRoles");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "VociComputo");

            migrationBuilder.DropTable(
                name: "SubRoles");

            migrationBuilder.DropTable(
                name: "Categorie");

            migrationBuilder.DropTable(
                name: "ElencoPrezzi");

            migrationBuilder.DropTable(
                name: "SubCategorie");

            migrationBuilder.DropTable(
                name: "SuperCategorie");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "Files");

            migrationBuilder.DropTable(
                name: "SoaClassifications");

            migrationBuilder.DropTable(
                name: "Soa");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
