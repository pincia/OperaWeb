namespace OperaWeb.Server.Models.XPVE
{
    /// <remarks/>
    [Serializable()]
    [System.ComponentModel.DesignerCategory("code")]
    public partial class PweDocumentoPweDatiGeneraliPweDGProgettoPweDGDatiGenerali
    {

        private decimal percPrezziField;

        private string comuneField;

        private string provinciaField;

        private string oggettoField;

        private string committenteField;

        private string impresaField;

        private string parteOperaField;

        /// <remarks/>
        public decimal PercPrezzi
        {
            get
            {
                return percPrezziField;
            }
            set
            {
                percPrezziField = value;
            }
        }

        /// <remarks/>
        public string Comune
        {
            get
            {
                return comuneField;
            }
            set
            {
                comuneField = value;
            }
        }

        /// <remarks/>
        public string Provincia
        {
            get
            {
                return provinciaField;
            }
            set
            {
                provinciaField = value;
            }
        }

        /// <remarks/>
        public string Oggetto
        {
            get
            {
                return oggettoField;
            }
            set
            {
                oggettoField = value;
            }
        }

        /// <remarks/>
        public string Committente
        {
            get
            {
                return committenteField;
            }
            set
            {
                committenteField = value;
            }
        }

        /// <remarks/>
        public string Impresa
        {
            get
            {
                return impresaField;
            }
            set
            {
                impresaField = value;
            }
        }

        /// <remarks/>
        public string ParteOpera
        {
            get
            {
                return parteOperaField;
            }
            set
            {
                parteOperaField = value;
            }
        }
    }


}
