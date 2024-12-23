namespace OperaWeb.Server.DataClasses.Models
{
  public class ProjectConfigurations
  {
    public int Id { get; set; }
    public int NPU { get; set; }
    public int Lunghezza { get; set; }
    public int Larghezza { get; set; }
    public int AltezzaPeso { get; set; }
    public int ProdottoQta { get; set; }
    public int PrezzoValuta1 { get; set; }
    public int PrezzoValuta2 { get; set; }
    public int ImportoValuta1 { get; set; }
    public int ImportoValuta2 { get; set; }
    public int Aliquote { get; set; }
    public string Currency { get; set; }
    public int ProjectID { get; set; }
    public virtual Project Project { get; set; }
  }
}
