using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OperaWeb.Server.DataClasses.Models;
using OperaWeb.Server.Models;

namespace OperaWeb.Server.DataClasses.Configurations
{
  public class FiguraConfiguration : IEntityTypeConfiguration<Figure>
  {
    public void Configure(EntityTypeBuilder<Figure> builder)
    {
      builder.ToTable("Figures");
      builder.HasKey(f => f.Id);
      builder.Property(f => f.Code).HasMaxLength(50).IsRequired();
      builder.Property(f => f.Name).HasMaxLength(100).IsRequired();
    }
  }
}
