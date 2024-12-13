using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Text.RegularExpressions;
using OperaWeb.Server.DataClasses.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System.Reflection.Metadata;
namespace OperaWeb.Server.DataClasses.Context
{
  public class OperaWebDbContext : IdentityDbContext<ApplicationUser>
  {
    public virtual DbSet<Project> Documenti { get; set; }
    public virtual DbSet<DatiGenerali> DatiGenerali { get; set; }
    public virtual DbSet<Categoria> Categorie { get; set; }
    public virtual DbSet<SubCategoria> SubCategorie { get; set; }
    public virtual DbSet<SuperCategoria> SuperCategorie { get; set; }
    public virtual DbSet<Categoria> CapitoliCategorieItems { get; set; }
    public virtual DbSet<Analisi> Analisi { get; set; }
    public virtual DbSet<ConfigNumeri> ConfigNumeri { get; set; }
    public virtual DbSet<ElencoPrezzo> ElencoPrezzi { get; set; }
    public virtual DbSet<VoceComputo> VociComputo { get; set; }
    public virtual DbSet<Misura> Misure { get; set; }
    public virtual DbSet<Project> Projects { get; set; }
    public virtual DbSet<Template> Templates { get; set; }
    public virtual DbSet<Soa> Soas { get; set; }
    public virtual DbSet<SoaClassification> SoaClassifications { get; set; }

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
      .HasOne(e => e.SubCategoria)
      .WithMany()
      .HasForeignKey(e => e.SubCategoriaID)
      .OnDelete(DeleteBehavior.NoAction);

        entity
      .HasOne(e => e.Project)
      .WithMany()
      .HasForeignKey(e => e.ProjectID)
      .OnDelete(DeleteBehavior.NoAction);

      });

      modelBuilder.Entity<ElencoPrezzo>(entity =>
      {
        entity
         .HasOne(e => e.Project)
         .WithMany()
         .HasForeignKey(e => e.ProjectID)
         .OnDelete(DeleteBehavior.NoAction);
      });

      modelBuilder.Entity<Project>()
      .HasMany(e => e.VociComputo)
      .WithOne(e => e.Project)
      .HasForeignKey(e => e.ProjectID)
      .HasPrincipalKey(e => e.ID);


      modelBuilder.Entity<Project>()
      .HasMany(e => e.SuperCategorie)
      .WithOne(e => e.Project)
      .HasForeignKey(e => e.ProjectID)
      .HasPrincipalKey(e => e.ID);

      modelBuilder.Entity<Project>()
      .HasMany(e => e.Categorie)
      .WithOne(e => e.Project)
      .HasForeignKey(e => e.ProjectID)
      .HasPrincipalKey(e => e.ID);

      modelBuilder.Entity<Project>()
      .HasMany(e => e.SubCategorie)
      .WithOne(e => e.Project)
      .HasForeignKey(e => e.ProjectID)
      .HasPrincipalKey(e => e.ID);

      modelBuilder.Entity<Project>()
      .HasMany(e => e.ConfigNumeri)
      .WithOne(e => e.Project)
      .HasForeignKey(e => e.ProjectID)
      .HasPrincipalKey(e => e.ID);

      modelBuilder.Entity<Project>()
      .HasMany(e => e.DatiGenerali)
      .WithOne(e => e.Project)
      .HasForeignKey(e => e.ProjectID)
      .HasPrincipalKey(e => e.ID);

      modelBuilder.Entity<Project>()
      .HasMany(e => e.ElencoPrezzi)
      .WithOne(e => e.Project)
      .HasForeignKey(e => e.ProjectID)
      .HasPrincipalKey(e => e.ID);


      modelBuilder.Entity<Categoria>(entity =>
        {
          entity
    .HasOne(e => e.Project)
    .WithMany()
    .HasForeignKey(e => e.ProjectID)
    .OnDelete(DeleteBehavior.NoAction);

        });

      //    modelBuilder.Entity<SuperCategoria>(entity =>
      //    {
      //      entity
      //.HasOne(e => e.Project)
      //.WithMany()
      //.HasForeignKey(e => e.ProjectID)
      //.OnDelete(DeleteBehavior.NoAction);

      //    });
      //    modelBuilder.Entity<SubCategoria>(entity =>
      //    {
      //      entity
      //.HasOne(e => e.Project)
      //.WithMany()
      //.HasForeignKey(e => e.ProjectID)
      //.OnDelete(DeleteBehavior.NoAction);

      //    });
      //    modelBuilder.Entity<Categoria>(entity =>
      //    {
      //      entity
      //.HasOne(e => e.Project)
      //.WithMany()
      //.HasForeignKey(e => e.ProjectID)
      //.OnDelete(DeleteBehavior.NoAction);

      //});
      //modelBuilder.Entity<Documento>(entity =>
      //{
      //    entity.HasKey(t => t.ID);
      //});
      //modelBuilder.Entity<Analisi>(entity =>
      //{
      //    entity.HasKey(t => t.ID);
      //});
      //modelBuilder.Entity<ConfigNumeri>(entity =>
      //{
      //    entity.HasKey(t => t.ID);
      //});

      //modelBuilder.Entity<DatiGenerali>(entity =>
      //{
      //    entity.HasKey(t => t.ID);
      //});


      modelBuilder.Entity<ElencoPrezzo>(entity =>
      {
        //entity
        // .HasOne(e => e.SubCategory)
        // .WithMany()
        // .HasForeignKey(e => e.SubCategoryId)
        // .HasConstraintName("FK_ElencoPrezzi_SubCategory")
        // .OnDelete(DeleteBehavior.NoAction);


        //entity
        //.HasOne(e => e.Category)
        //.WithMany()
        //.HasForeignKey(e => e.Category)
        //.HasConstraintName("FK_ElencoPrezzi_Category")
        //.OnDelete(DeleteBehavior.NoAction);

        //entity
        //.HasOne(e => e.SuperCategory)
        //.WithMany()
        //.HasForeignKey(e => e.SuperCategoryId)
        //.HasConstraintName("FK_ElencoPrezzi_SuperCategory")
        //.OnDelete(DeleteBehavior.NoAction);

      });
      modelBuilder.Entity<Template>(entity =>
      {
      });
    }
  }
}

