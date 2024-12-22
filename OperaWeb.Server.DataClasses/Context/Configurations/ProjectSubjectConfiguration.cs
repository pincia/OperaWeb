using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OperaWeb.Server.DataClasses.Models;

public class ProjectSubjectConfiguration : IEntityTypeConfiguration<ProjectSubject>
{
  public void Configure(EntityTypeBuilder<ProjectSubject> builder)
  {
    builder.HasKey(ps => ps.Id);

    builder.HasOne(ps => ps.Project)
          .WithMany(p => p.ProjectSubjects)
          .HasForeignKey(ps => ps.ProjectId)
          .OnDelete(DeleteBehavior.NoAction); // Nessuna azione

    builder.HasOne(ps => ps.User)
           .WithMany()
           .HasForeignKey(ps => ps.UserId)
           .OnDelete(DeleteBehavior.Restrict); // Evita il comportamento a cascata
  }
}
