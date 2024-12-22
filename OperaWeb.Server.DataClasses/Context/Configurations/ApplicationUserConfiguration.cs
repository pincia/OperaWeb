using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OperaWeb.Server.DataClasses;
using OperaWeb.Server.DataClasses.Models;
using OperaWeb.Server.DataClasses.Models.User;

public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
{
  public void Configure(EntityTypeBuilder<ApplicationUser> builder)
  {
    builder.HasKey(e => e.Id); // Assicura che 'Id' sia la chiave primaria
    builder.HasOne(e => e.Comune) // Esempio di relazione personalizzata
          .WithMany()
          .HasForeignKey(e => e.ComuneId)
          .OnDelete(DeleteBehavior.SetNull);

  }
}
