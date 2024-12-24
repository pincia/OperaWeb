using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using OperaWeb.Server.DataClasses.Models;

public class UserProjectAccessConfiguration : IEntityTypeConfiguration<UserProjectAccess>
{
  public void Configure(EntityTypeBuilder<UserProjectAccess> builder)
  {
    builder.HasKey(rp => rp.Id);

    builder.HasOne(rp => rp.User)
          .WithMany(u => u.UserProjectAccesses)
          .HasForeignKey(rp => rp.UserId)
          .OnDelete(DeleteBehavior.NoAction);

    builder.HasOne(rp => rp.Project)
          .WithMany(p => p.UserProjectAccesses)
          .HasForeignKey(rp => rp.ProjectId)
          .OnDelete(DeleteBehavior.NoAction);

    builder.Property(rp => rp.LastAccessed)
          .IsRequired();
  }
}
