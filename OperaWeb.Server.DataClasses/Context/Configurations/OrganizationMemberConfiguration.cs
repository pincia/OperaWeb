using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Reflection.Emit;
namespace OperaWeb.Server.DataClasses.Context.Configurations
{
  public class NotificationConfiguration : IEntityTypeConfiguration<OrganizationMember>
  {
    public void Configure(EntityTypeBuilder<OrganizationMember> builder)
    {
      builder.ToTable("OrganizationMembers");

      builder.HasKey(m => m.Id);

      builder.HasOne(m => m.User)
            .WithMany()
            .HasForeignKey(m => m.UserId)
            .OnDelete(DeleteBehavior.NoAction);


      // Relazione con OrganizationId - Restringe l'eliminazione
      builder.HasOne(m => m.Organization)
            .WithMany()
            .HasForeignKey(m => m.OrganizationId)
            .OnDelete(DeleteBehavior.Restrict);

      // Relazione con RoleId - Nessuna azione per sicurezza
      builder.HasOne(m => m.Role)
            .WithMany()
            .HasForeignKey(m => m.RoleId)
            .OnDelete(DeleteBehavior.Restrict);
    }
  }
}