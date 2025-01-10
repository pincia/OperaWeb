namespace OperaWeb.Server.Models.XPVE
{
    /// <remarks/>
    [Serializable()]
    [System.ComponentModel.DesignerCategory("code")]
    public partial class PweDocumentoPweMisurazioniEPItem
    {

        private int tipoEPField;

        private string tariffaField;

        private string articoloField;

        private string desRidottaField;

        private string desEstesaField;

        private string desBreveField;

        private string unMisuraField;

        private decimal prezzo1Field;

        private decimal prezzo2Field;

        private decimal prezzo3Field;

        private decimal prezzo4Field;

        private decimal prezzo5Field;

        private int iDSpCapField;

        private int iDCapField;

        private int iDSbCapField;

        private int flagsField;

        private string dataField;

        private string adrInternetField;

        private string pweEPAnalisiField;

        private int idField;

        private int? manodoperaField;
        /// <remarks/>
        public int TipoEP
        {
            get
            {
                return tipoEPField;
            }
            set
            {
                tipoEPField = value;
            }
        }

        /// <remarks/>
        public string Tariffa
        {
            get
            {
                return tariffaField;
            }
            set
            {
                tariffaField = value;
            }
        }

        /// <remarks/>
        public string Articolo
        {
            get
            {
                return articoloField;
            }
            set
            {
                articoloField = value;
            }
        }

        /// <remarks/>
        public string DesRidotta
        {
            get
            {
                return desRidottaField;
            }
            set
            {
                desRidottaField = value;
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
        public string DesBreve
        {
            get
            {
                return desBreveField;
            }
            set
            {
                desBreveField = value;
            }
        }

        /// <remarks/>
        public string UnMisura
        {
            get
            {
                return unMisuraField;
            }
            set
            {
                unMisuraField = value;
            }
        }

        /// <remarks/>
        public decimal Prezzo1
        {
            get
            {
                return prezzo1Field;
            }
            set
            {
                prezzo1Field = value;
            }
        }

        /// <remarks/>
        public decimal Prezzo2
        {
            get
            {
                return prezzo2Field;
            }
            set
            {
                prezzo2Field = value;
            }
        }

        /// <remarks/>
        public decimal Prezzo3
        {
            get
            {
                return prezzo3Field;
            }
            set
            {
                prezzo3Field = value;
            }
        }

        /// <remarks/>
        public decimal Prezzo4
        {
            get
            {
                return prezzo4Field;
            }
            set
            {
                prezzo4Field = value;
            }
        }

        /// <remarks/>
        public decimal Prezzo5
        {
            get
            {
                return prezzo5Field;
            }
            set
            {
                prezzo5Field = value;
            }
        }

        /// <remarks/>
        public int? Manodopera
        {
            get
            {
                return manodoperaField;
            }
            set
            {
              manodoperaField = value;
            }
        }

        /// <remarks/>
        public int IDCap
        {
            get
            {
                return iDCapField;
            }
            set
            {
                iDCapField = value;
            }
        }

        /// <remarks/>
        public int IDSbCap
        {
            get
            {
                return iDSbCapField;
            }
            set
            {
                iDSbCapField = value;
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
        public string Data
        {
            get
            {
                return dataField;
            }
            set
            {
                dataField = value;
            }
        }

        /// <remarks/>
        public string AdrInternet
        {
            get
            {
                return adrInternetField;
            }
            set
            {
                adrInternetField = value;
            }
        }

        /// <remarks/>
        public string PweEPAnalisi
        {
            get
            {
                return pweEPAnalisiField;
            }
            set
            {
                pweEPAnalisiField = value;
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
