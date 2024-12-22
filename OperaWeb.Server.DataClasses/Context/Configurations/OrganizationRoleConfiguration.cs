using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OperaWeb.Server.DataClasses.Models;
using OperaWeb.Server.DataClasses.Models.User;

public class OrganizationRoleConfiguration : IEntityTypeConfiguration<OrganizationRole>
{
  public void Configure(EntityTypeBuilder<OrganizationRole> builder)
  {
    builder.HasKey(or => or.Id);

    builder.Property(or => or.Name)
           .IsRequired()
           .HasMaxLength(100);

    builder.HasOne(or => or.ParentRole)
           .WithMany(or => or.SubRoles)
           .HasForeignKey(or => or.ParentRoleId)
           .OnDelete(DeleteBehavior.Restrict);
  }
}
