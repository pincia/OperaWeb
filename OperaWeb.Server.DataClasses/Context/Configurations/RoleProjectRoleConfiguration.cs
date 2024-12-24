using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace OperaWeb.Server.DataClasses.Models.User
{
  public class RoleProjectRoleConfiguration : IEntityTypeConfiguration<RoleProjectSubjectRole>
  {
    public void Configure(EntityTypeBuilder<RoleProjectSubjectRole> builder)
    {
      builder.HasKey(rs => new { rs.RoleId, rs.ProjectSubjectRoleId });

      builder.HasOne(rs => rs.Role)
             .WithMany()
             .HasForeignKey(rs => rs.RoleId);

      builder.HasOne(rs => rs.ProjectRole)
             .WithMany()
             .HasForeignKey(rs => rs.ProjectSubjectRoleId);
    }
  }
}