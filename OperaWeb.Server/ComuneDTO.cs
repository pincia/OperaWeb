namespace OperaWeb.Server.DataClasses.Models
{
  using Newtonsoft.Json;

  public class ComuneDTO
  {
    [JsonProperty("sigla_provincia")]
    public string SiglaProvincia { get; set; }

    [JsonProperty("codice_istat")]
    public string CodiceIstat { get; set; }

    [JsonProperty("denominazione_ita_altra")]
    public string DenominazioneItaAltra { get; set; }

    [JsonProperty("denominazione_ita")]
    public string DenominazioneIta { get; set; }

    [JsonProperty("denominazione_altra")]
    public string DenominazioneAltra { get; set; }

    [JsonProperty("flag_capoluogo")]
    public string FlagCapoluogo { get; set; } // Considera di convertirlo in bool successivamente

    [JsonProperty("codice_belfiore")]
    public string CodiceBelfiore { get; set; }

    [JsonProperty("lat")]
    public double Latitudine { get; set; }

    [JsonProperty("lon")]
    public double Longitudine { get; set; }

    [JsonProperty("superficie_kmq")]
    public double SuperficieKmq { get; set; }

    [JsonProperty("codice_sovracomunale")]
    public string CodiceSovracomunale { get; set; }
  }


}
