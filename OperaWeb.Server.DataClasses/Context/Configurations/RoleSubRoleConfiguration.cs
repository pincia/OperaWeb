using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace OperaWeb.Server.DataClasses.Models.User
{
  public class RoleSubRoleConfiguration : IEntityTypeConfiguration<RoleSubRole>
  {
    public void Configure(EntityTypeBuilder<RoleSubRole> builder)
    {
      builder.HasKey(rs => new { rs.RoleId, rs.SubRoleId });

      builder.HasOne(rs => rs.Role)
             .WithMany()
             .HasForeignKey(rs => rs.RoleId);

      builder.HasOne(rs => rs.SubRole)
             .WithMany()
             .HasForeignKey(rs => rs.SubRoleId);
    }
  }
}