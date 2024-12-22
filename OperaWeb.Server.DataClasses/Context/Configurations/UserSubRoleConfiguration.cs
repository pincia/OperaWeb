using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OperaWeb.Server.DataClasses.Models;
using OperaWeb.Server.DataClasses.Models.User;

public class UserSubRoleConfiguration : IEntityTypeConfiguration<UserSubRole>
{
  public void Configure(EntityTypeBuilder<UserSubRole> builder)
  {
    builder.HasKey(usr => new { usr.UserId, usr.SubRoleId });

    builder.HasOne(usr => usr.User)
           .WithMany()
           .HasForeignKey(usr => usr.UserId);

    builder.HasOne(usr => usr.SubRole)
           .WithMany()
           .HasForeignKey(usr => usr.SubRoleId);
  }
}
