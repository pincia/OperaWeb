namespace OperaWeb.Server.Models.XPVE
{
    /// <remarks/>
    [Serializable()]
    [System.ComponentModel.DesignerCategory("code")]
    public partial class PweDocumentoPweMisurazioniVCItem
    {

        private int iDEPField;

        private decimal quantitaField;

        private string dataMisField;

        private int flagsField;

        private int iDSpCatField;

        private int iDCatField;

        private int iDSbCatField;

        private PweDocumentoPweMisurazioniVCItemRGItem[] pweVCMisureField;

        private int idField;

        /// <remarks/>
        public int IDEP
        {
            get
            {
                return iDEPField;
            }
            set
            {
                iDEPField = value;
            }
        }

        /// <remarks/>
        public decimal Quantita
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
        public string DataMis
        {
            get
            {
                return dataMisField;
            }
            set
            {
                dataMisField = value;
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
        public int IDSpCat
        {
            get
            {
                return iDSpCatField;
            }
            set
            {
                iDSpCatField = value;
            }
        }

        /// <remarks/>
        public int IDCat
        {
            get
            {
                return iDCatField;
            }
            set
            {
                iDCatField = value;
            }
        }

        /// <remarks/>
        public int IDSbCat
        {
            get
            {
                return iDSbCatField;
            }
            set
            {
                iDSbCatField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItem("RGItem", IsNullable = false)]
        public PweDocumentoPweMisurazioniVCItemRGItem[] PweVCMisure
        {
            get
            {
                return pweVCMisureField;
            }
            set
            {
                pweVCMisureField = value;
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
