using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace OperaWeb.Server.DataClasses.Models.User
{
  public class FIgureProjectRoleConfiguration : IEntityTypeConfiguration<FigureProjectSubjectRole>
  {
    public void Configure(EntityTypeBuilder<FigureProjectSubjectRole> builder)
    {
      builder.HasKey(rs => new { rs.FigureId, rs.ProjectSubjectRoleId });

      builder.HasOne(rs => rs.Figure)
             .WithMany()
             .HasForeignKey(rs => rs.FigureId);

      builder.HasOne(rs => rs.ProjectSubjectRole)
             .WithMany()
             .HasForeignKey(rs => rs.ProjectSubjectRoleId);
    }
  }
}