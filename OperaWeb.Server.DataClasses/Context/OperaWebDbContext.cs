using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Text.RegularExpressions;
using OperaWeb.Server.DataClasses.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System.Reflection.Metadata;
using OperaWeb.Server.DataClasses.Models.User;
using OperaWeb.Server.Models;
namespace OperaWeb.Server.DataClasses.Context
{
  public class OperaWebDbContext : IdentityDbContext<ApplicationUser>
  {
    public virtual DbSet<SubRole> SubRoles { get; set; }
    public DbSet<OrganizationRole> OrganizationRoles { get; set; }
    public DbSet<OrganizationMember> OrganizationMembers { get; set; }
    public virtual DbSet<Comune> Comuni { get; set; }
    public virtual DbSet<Provincia> Province { get; set; }
    public virtual DbSet<UserSubRole> UserSubRoles { get; set; }
    public virtual DbSet<RoleSubRole> RoleSubRoles { get; set; }
    public virtual DbSet<Notification> Notifications { get; set; }
    public virtual DatiGenerali DatiGenerali { get; set; }
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
    public virtual DbSet<Soa> Soas { get; set; }
    public virtual DbSet<SoaClassification> SoaClassifications { get; set; }

    public DbSet<IdentityRoleOrganizationRoleMapping> OrganizationRoleMappings { get; set; }

    public OperaWebDbContext(DbContextOptions<OperaWebDbContext> options) : base(options)
    {
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<VoceComputo>(entity =>
   {
     entity.HasKey(t => t.ID);

     entity
      .HasOne(e => e.SuperCategoria)
      .WithMany()
      .HasForeignKey(e => e.SuperCategoriaID)
      .OnDelete(DeleteBehavior.NoAction);

     entity
           .HasOne(e => e.Categoria)
           .WithMany()
           .HasForeignKey(e => e.CategoriaID)
           .OnDelete(DeleteBehavior.NoAction);

     entity
           .HasOne(e => e.SubCategoria)
           .WithMany()
           .HasForeignKey(e => e.SubCategoriaID)
           .OnDelete(DeleteBehavior.NoAction);

     entity
      .HasOne(e => e.Project)
      .WithMany(p => p.VociComputo)
      .HasForeignKey(e => e.ProjectID)
      .OnDelete(DeleteBehavior.Cascade);
   });
      modelBuilder.Entity<ElencoPrezzo>()
         .HasOne(e => e.Project)
         .WithMany(p => p.ElencoPrezzi)
         .HasForeignKey(e => e.ProjectID)
         .OnDelete(DeleteBehavior.Cascade);

      modelBuilder.Entity<Project>()
      .HasMany(e => e.VociComputo)
      .WithOne(e => e.Project)
      .HasForeignKey(e => e.ProjectID);

      modelBuilder.Entity<Project>()
    .HasMany(e => e.ElencoPrezzi)
    .WithOne(e => e.Project)
    .HasForeignKey(e => e.ProjectID);

      modelBuilder.Entity<Project>()
      .HasMany(e => e.SuperCategorie)
      .WithOne(e => e.Project)
      .HasForeignKey(e => e.ProjectID);

      modelBuilder.Entity<Project>()
      .HasMany(e => e.Categorie)
      .WithOne(e => e.Project)
      .HasForeignKey(e => e.ProjectID);

      modelBuilder.Entity<Project>()
      .HasMany(e => e.SubCategorie)
      .WithOne(e => e.Project)
      .HasForeignKey(e => e.ProjectID);

      modelBuilder.Entity<Project>()
      .HasMany(e => e.ConfigNumeri)
      .WithOne(e => e.Project)
      .HasForeignKey(e => e.ProjectID);

      modelBuilder.Entity<Project>()
          .HasOne(p => p.DatiGenerali)
          .WithOne(d => d.Project)
          .HasForeignKey<DatiGenerali>(d => d.ProjectID)
          .OnDelete(DeleteBehavior.Cascade);


      modelBuilder.Entity<Project>()
      .HasMany(e => e.ElencoPrezzi)
      .WithOne(e => e.Project)
      .HasForeignKey(e => e.ProjectID);

      // Configurazione della relazione Provincia -> Comuni
      modelBuilder.Entity<Provincia>()
          .HasMany(p => p.Comuni)
          .WithOne(c => c.Provincia)
          .HasForeignKey(c => c.ProvinciaId)
          .OnDelete(DeleteBehavior.Cascade);

      // Configurazione della relazione Comune -> ApplicationUser
      modelBuilder.Entity<ApplicationUser>()
          .HasOne(u => u.Comune)
          .WithMany()
          .HasForeignKey(u => u.ComuneId)
          .OnDelete(DeleteBehavior.SetNull);


      modelBuilder.Entity<Template>(entity =>
      {
      });

      modelBuilder.Entity<RoleSubRole>()
        .HasOne(rs => rs.Role)
        .WithMany()
        .HasForeignKey(rs => rs.RoleId);

      modelBuilder.Entity<RoleSubRole>()
          .HasOne(rs => rs.SubRole)
          .WithMany()
          .HasForeignKey(rs => rs.SubRoleId);

      // Configura la chiave primaria composita
      modelBuilder.Entity<UserSubRole>()
          .HasKey(ur => new { ur.UserId, ur.SubRoleId });

      // Configura la relazione tra UserSubRole e ApplicationUser
      modelBuilder.Entity<UserSubRole>()
          .HasOne(ur => ur.User)
          .WithMany()
          .HasForeignKey(ur => ur.UserId);

      modelBuilder.Entity<RoleSubRole>()
    .HasKey(rs => new { rs.RoleId, rs.SubRoleId });
      modelBuilder.Entity<Notification>()
    .HasKey(n => n.Id);

      modelBuilder.Entity<Notification>()
          .HasOne(n => n.User)
          .WithMany()
          .HasForeignKey("UserId")
          .OnDelete(DeleteBehavior.Cascade);

      // Configurazione per OrganizationRole (Gerarchia Ruoli)
      modelBuilder.Entity<OrganizationRole>(entity =>
      {
        entity.ToTable("OrganizationRoles");
        entity.HasKey(r => r.Id);

        entity.Property(r => r.Name)
              .IsRequired()
              .HasMaxLength(100);

        entity.HasOne(r => r.ParentRole)
              .WithMany(r => r.SubRoles)
              .HasForeignKey(r => r.ParentRoleId)
              .OnDelete(DeleteBehavior.Restrict); // Evita eliminazioni a cascata
      });
      // Configurazione per OrganizationMember
      modelBuilder.Entity<OrganizationMember>(entity =>
      {
        entity.ToTable("OrganizationMembers");

        entity.HasKey(m => m.Id);

        // Relazione con UserId - Cascata consentita
        entity.HasOne(m => m.User)
              .WithMany()
              .HasForeignKey(m => m.UserId)
              .OnDelete(DeleteBehavior.Cascade);

        // Relazione con OrganizationId - Restringe l'eliminazione
        entity.HasOne(m => m.Organization)
              .WithMany()
              .HasForeignKey(m => m.OrganizationId)
              .OnDelete(DeleteBehavior.Restrict);

        // Relazione con RoleId - Nessuna azione per sicurezza
        entity.HasOne(m => m.Role)
              .WithMany()
              .HasForeignKey(m => m.RoleId)
              .OnDelete(DeleteBehavior.Restrict);
      });
      modelBuilder.Entity<IdentityRoleOrganizationRoleMapping>(entity =>
      {
        entity.ToTable("IdentityRoleOrganizationRoleMapping");

        entity.HasKey(r => r.Id);

        // Relazione con IdentityRole
        entity.HasOne(r => r.IdentityRole)
              .WithMany()
              .HasForeignKey(r => r.IdentityRoleId)
              .OnDelete(DeleteBehavior.Cascade);

        // Relazione con OrganizationRole
        entity.HasOne(r => r.OrganizationRole)
              .WithMany()
              .HasForeignKey(r => r.OrganizationRoleId)
              .OnDelete(DeleteBehavior.Cascade);
      });
    }

  }
}

