using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OperaWeb.Server.DataClasses.Models;
using OperaWeb.Server.DataClasses.Models.User;
using OperaWeb.Server.Models;

namespace OperaWeb.Server.DataClasses.Context
{
    public class OperaWebDbContext : IdentityDbContext<ApplicationUser>
  {
    public virtual DbSet<SubRole> SubRoles { get; set; }
    public DbSet<OrganizationRole> OrganizationRoles { get; set; }
    public virtual DbSet<ProjectConfiguration> ProjectConfigurations { get; set; }
    public DbSet<OrganizationMember> OrganizationMembers { get; set; }
    public virtual DbSet<Comune> Comuni { get; set; }
    public virtual DbSet<Provincia> Province { get; set; }
    public virtual DbSet<UserSubRole> UserSubRoles { get; set; }
    public virtual DbSet<RoleSubRole> RoleSubRoles { get; set; }
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
    public virtual DbSet<ProjectSubjectRole> SubjectRoles { get; set; }
    public DbSet<IdentityRoleOrganizationRoleMapping> OrganizationRoleMappings { get; set; }

    public OperaWebDbContext(DbContextOptions<OperaWebDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      // Estensioni Fluent API per configurazioni
      modelBuilder.ApplyConfigurationsFromAssembly(typeof(OperaWebDbContext).Assembly);
    }
  }
}
