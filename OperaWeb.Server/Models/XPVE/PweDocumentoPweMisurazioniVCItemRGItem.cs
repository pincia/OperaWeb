namespace OperaWeb.Server.Models.XPVE
{
    /// <remarks/>
    [Serializable()]
    [System.ComponentModel.DesignerCategory("code")]
    public partial class PweDocumentoPweMisurazioniVCItemRGItem
    {

        private int iDVVField;

        private string descrizioneField;

        private string partiUgualiField;

        private string lunghezzaField;

        private string larghezzaField;

        private string hPesoField;

        private string quantitaField;

        private int flagsField;

        private int idField;

        /// <remarks/>
        public int IDVV
        {
            get
            {
                return iDVVField;
            }
            set
            {
                iDVVField = value;
            }
        }

        /// <remarks/>
        public string Descrizione
        {
            get
            {
                return descrizioneField;
            }
            set
            {
                descrizioneField = value;
            }
        }

        /// <remarks/>
        public string PartiUguali
        {
            get
            {
                return partiUgualiField;
            }
            set
            {
                partiUgualiField = value;
            }
        }

        /// <remarks/>
        public string Lunghezza
        {
            get
            {
                return lunghezzaField;
            }
            set
            {
                lunghezzaField = value;
            }
        }

        /// <remarks/>
        public string Larghezza
        {
            get
            {
                return larghezzaField;
            }
            set
            {
                larghezzaField = value;
            }
        }

        /// <remarks/>
        public string HPeso
        {
            get
            {
                return hPesoField;
            }
            set
            {
                hPesoField = value;
            }
        }

        /// <remarks/>
        public string Quantita
        {
            get
            {
                return quantitaField;
            }
            set
            {
                quantitaField = value;
            }
        }

        /// <remarks/>
        public int Flags
        {
            get
            {
                return flagsField;
            }
            set
            {
                flagsField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttribute()]
        public int ID
        {
            get
            {
                return idField;
            }
            set
            {
                idField = value;
            }
        }
    }


}
