using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OperaWeb.Server.DataClasses.Models;

public class NotificationConfiguration : IEntityTypeConfiguration<Notification>
{
  public void Configure(EntityTypeBuilder<Notification> builder)
  {
    builder.HasKey(n => n.Id);

    builder.HasOne(n => n.User)
           .WithMany()
           .HasForeignKey(n => n.User.Id)
           .OnDelete(DeleteBehavior.Cascade);
  }
}
