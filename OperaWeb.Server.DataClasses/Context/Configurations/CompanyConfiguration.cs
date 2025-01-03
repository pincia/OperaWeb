using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OperaWeb.Server.DataClasses.Models;

public class CompanyConfiguration : IEntityTypeConfiguration<Company>
{
  public void Configure(EntityTypeBuilder<Company> builder)
  {
    // Define primary key
    builder.HasKey(c => c.Id);

    // Define optional relationship with Comune
    builder.HasOne(c => c.Comune)
           .WithMany()
           .HasForeignKey(c => c.ComuneId)
           .OnDelete(DeleteBehavior.Restrict);

    // Define optional relationship with Provincia
    builder.HasOne(c => c.Provincia)
           .WithMany()
           .HasForeignKey(c => c.ProvinciaId)
           .OnDelete(DeleteBehavior.Restrict);

    // Set required properties
    builder.Property(c => c.Name)
           .IsRequired()
           .HasMaxLength(255);

    builder.Property(c => c.VatOrTaxCode)
           .IsRequired()
           .HasMaxLength(50);

    builder.Property(c => c.Address)
           .HasMaxLength(255);

    builder.Property(c => c.Email)
           .HasMaxLength(100);

    builder.Property(c => c.PhoneNumber)
           .HasMaxLength(50);

    builder.Property(c => c.Website)
           .HasMaxLength(100);

    builder.Property(c => c.SDICode)
           .HasMaxLength(50);

    builder.Property(c => c.PEC)
           .HasMaxLength(100);

    builder.Property(c => c.CompanyType)
           .HasMaxLength(50);
  }
}
