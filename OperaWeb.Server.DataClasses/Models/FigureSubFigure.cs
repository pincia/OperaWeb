
using OperaWeb.Server.DataClasses.Models;
using OperaWeb.Server.Models;

public class FigureSubFigure
{
  public int FigureId { get; set; }
  public virtual Figure Figure { get; set; }

  public int SubFigureId { get; set; }
  public virtual SubFigure SubFigure { get; set; }
}
