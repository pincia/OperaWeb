using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OperaWeb.Server.DataClasses.Models;
using ProjectTask = OperaWeb.Server.DataClasses.Models.ProjectTask;

namespace OperaWeb.Server.DataClasses.Configurations
{
  public class TaskConfiguration : IEntityTypeConfiguration<ProjectTask>
  {
    public void Configure(EntityTypeBuilder<ProjectTask> builder)
    {
      // Chiave primaria
      builder.HasKey(t => t.Id);

      // Proprietà obbligatorie
      builder.Property(t => t.Name).IsRequired().HasMaxLength(200);
      builder.Property(t => t.StartDate).IsRequired();
      builder.Property(t => t.EndDate).IsRequired();

      // Relazione con se stesso (Task padre)
      builder
          .HasOne(t => t.Parent)
          .WithMany(t => t.SubTasks)
          .HasForeignKey(t => t.ParentId)
          .OnDelete(DeleteBehavior.Restrict);

      // Relazione con Project
      builder
          .HasOne(t => t.Project)
          .WithMany(p => p.ProjectTasks)
          .HasForeignKey(t => t.ProjectId)
          .OnDelete(DeleteBehavior.Cascade);
    }
  }
}
