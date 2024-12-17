namespace OperaWeb.Server.DataClasses.DTO
{
    using Newtonsoft.Json;

    public class ProvinciaDTO
    {
        [JsonProperty("codice_regione")]
        public string CodiceRegione { get; set; }

        [JsonProperty("sigla_provincia")]
        public string SiglaProvincia { get; set; }

        [JsonProperty("denominazione_provincia")]
        public string DenominazioneProvincia { get; set; }

        [JsonProperty("tipologia_provincia")]
        public string TipologiaProvincia { get; set; }

        [JsonProperty("numero_comuni")]
        public int NumeroComuni { get; set; }

        [JsonProperty("superficie_kmq")]
        public double SuperficieKmq { get; set; }

        [JsonProperty("codice_sovracomunale")]
        public string CodiceSovracomunale { get; set; }
    }

}
