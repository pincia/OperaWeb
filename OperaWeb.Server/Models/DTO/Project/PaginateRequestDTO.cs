namespace OperaWeb.Server.Models.DTO
{
  public class PaginatedRequestDTO
  {
    /// <summary>
    /// Testo di ricerca.
    /// </summary>
    public string Query { get; set; } = string.Empty;

    /// <summary>
    /// Numero della pagina corrente.
    /// </summary>
    public int Page { get; set; } = 1;

    /// <summary>
    /// Numero di elementi per pagina.
    /// </summary>
    public int PageSize { get; set; } = 10;
  }
}
