using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace OperaWeb.Server.DataClasses.Models.User
{
  public class FigureSubFigureConfiguration : IEntityTypeConfiguration<FigureSubFigure>
  {
    public void Configure(EntityTypeBuilder<FigureSubFigure> builder)
    {
      builder.HasKey(rs => new { rs.FigureId, rs.SubFigureId });

      builder.HasOne(rs => rs.Figure)
             .WithMany()
             .HasForeignKey(rs => rs.FigureId);

      builder.HasOne(rs => rs.SubFigure)
             .WithMany()
             .HasForeignKey(rs => rs.SubFigureId);
    }
  }
}