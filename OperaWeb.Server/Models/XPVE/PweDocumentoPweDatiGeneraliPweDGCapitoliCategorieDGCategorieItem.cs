namespace OperaWeb.Server.Models.XPVE
{
    /// <remarks/>
    [Serializable()]
    [System.ComponentModel.DesignerCategory("code")]
    public partial class PweDocumentoPweDatiGeneraliPweDGCapitoliCategorieDGCategorieItem
    {

        private string desSinteticaField;

        private string desEstesaField;

        private string dataInitField;

        private decimal durataField;

        private string codFaseField;

        private decimal percentualeField;

        private string codiceField;

        private int idField;

        /// <remarks/>
        public string DesSintetica
        {
            get
            {
                return desSinteticaField;
            }
            set
            {
                desSinteticaField = value;
            }
        }

        /// <remarks/>
        public string DesEstesa
        {
            get
            {
                return desEstesaField;
            }
            set
            {
                desEstesaField = value;
            }
        }

        /// <remarks/>
        public string DataInit
        {
            get
            {
                return dataInitField;
            }
            set
            {
                dataInitField = value;
            }
        }

        /// <remarks/>
        public decimal Durata
        {
            get
            {
                return durataField;
            }
            set
            {
                durataField = value;
            }
        }

        /// <remarks/>
        public string CodFase
        {
            get
            {
                return codFaseField;
            }
            set
            {
                codFaseField = value;
            }
        }

        /// <remarks/>
        public decimal Percentuale
        {
            get
            {
                return percentualeField;
            }
            set
            {
                percentualeField = value;
            }
        }

        /// <remarks/>
        public string Codice
        {
            get
            {
                return codiceField;
            }
            set
            {
                codiceField = value;
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
