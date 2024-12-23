using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OperaWeb.Server.DataClasses.Models;

public class ProjectConfiguration : IEntityTypeConfiguration<Project>
{
  public void Configure(EntityTypeBuilder<Project> builder)
  {
    builder.HasKey(p => p.ID);

    builder.HasMany(p => p.VociComputo)
           .WithOne(vc => vc.Project)
           .HasForeignKey(vc => vc.ProjectID)
           .OnDelete(DeleteBehavior.Cascade);

    builder.HasMany(p => p.ElencoPrezzi)
           .WithOne(ep => ep.Project)
           .HasForeignKey(ep => ep.ProjectID)
           .OnDelete(DeleteBehavior.Cascade);

    builder.HasMany(p => p.SuperCategorie)
           .WithOne(sc => sc.Project)
           .HasForeignKey(sc => sc.ProjectID);

    builder.HasMany(p => p.Categorie)
           .WithOne(c => c.Project)
           .HasForeignKey(c => c.ProjectID);

    builder.HasMany(p => p.SubCategorie)
           .WithOne(sc => sc.Project)
           .HasForeignKey(sc => sc.ProjectID);

    builder.HasOne(p => p.ConfigNumeri)
           .WithOne(cn => cn.Project)
           .HasForeignKey<ConfigNumeri>(dg => dg.ProjectID)
           .OnDelete(DeleteBehavior.Cascade);

    builder.HasMany(p => p.ProjectSubjects)
           .WithOne(ps => ps.Project)
           .HasForeignKey(ps => ps.ProjectId);

    builder.HasOne(p => p.User)
        .WithMany()
        .HasForeignKey(p => p.UserId)
        .OnDelete(DeleteBehavior.Restrict);

    builder.HasOne(p => p.DatiGenerali)
           .WithOne(dg => dg.Project)
           .HasForeignKey<DatiGenerali>(dg => dg.ProjectID)
           .OnDelete(DeleteBehavior.Cascade);

    builder.HasOne(p => p.Analisi)
       .WithOne(dg => dg.Project)
       .HasForeignKey<Analisi>(dg => dg.ProjectID)
       .OnDelete(DeleteBehavior.Cascade);
  }
}
