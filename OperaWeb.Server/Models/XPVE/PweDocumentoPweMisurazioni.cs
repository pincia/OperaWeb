namespace OperaWeb.Server.Models.XPVE
{
    /// <remarks/>
    [Serializable()]
    [System.ComponentModel.DesignerCategory("code")]
    public partial class PweDocumentoPweMisurazioni
    {

        private PweDocumentoPweMisurazioniEPItem[] pweElencoPrezziField;

        private PweDocumentoPweMisurazioniVCItem[] pweVociComputoField;

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItem("EPItem", IsNullable = false)]
        public PweDocumentoPweMisurazioniEPItem[] PweElencoPrezzi
        {
            get
            {
                return pweElencoPrezziField;
            }
            set
            {
                pweElencoPrezziField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItem("VCItem", IsNullable = false)]
        public PweDocumentoPweMisurazioniVCItem[] PweVociComputo
        {
            get
            {
                return pweVociComputoField;
            }
            set
            {
                pweVociComputoField = value;
            }
        }
    }


}
