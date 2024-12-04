namespace OperaWeb.Server.Models.XPVE
{
    /// <remarks/>
    [Serializable()]
    [System.ComponentModel.DesignerCategory("code")]
    public partial class PweDocumentoPweDatiGeneraliPweDGCapitoliCategorie
    {

        private object pweDGSuperCapitoliField;

        private object pweDGCapitoliField;

        private object pweDGSubCapitoliField;

        private PweDocumentoPweDatiGeneraliPweDGCapitoliCategorieDGSuperCategorieItem[] pweDGSuperCategorieField;

        private PweDocumentoPweDatiGeneraliPweDGCapitoliCategorieDGCategorieItem[] pweDGCategorieField;

        private PweDocumentoPweDatiGeneraliPweDGCapitoliCategorieDGSubCategorieItem[] pweDGSubCategorieField;

        /// <remarks/>
        public object PweDGSuperCapitoli
        {
            get
            {
                return pweDGSuperCapitoliField;
            }
            set
            {
                pweDGSuperCapitoliField = value;
            }
        }

        /// <remarks/>
        public object PweDGCapitoli
        {
            get
            {
                return pweDGCapitoliField;
            }
            set
            {
                pweDGCapitoliField = value;
            }
        }

        /// <remarks/>
        public object PweDGSubCapitoli
        {
            get
            {
                return pweDGSubCapitoliField;
            }
            set
            {
                pweDGSubCapitoliField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItem("DGSuperCategorieItem", IsNullable = false)]
        public PweDocumentoPweDatiGeneraliPweDGCapitoliCategorieDGSuperCategorieItem[] PweDGSuperCategorie
        {
            get
            {
                return pweDGSuperCategorieField;
            }
            set
            {
                pweDGSuperCategorieField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItem("DGCategorieItem", IsNullable = false)]
        public PweDocumentoPweDatiGeneraliPweDGCapitoliCategorieDGCategorieItem[] PweDGCategorie
        {
            get
            {
                return pweDGCategorieField;
            }
            set
            {
                pweDGCategorieField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItem("DGSubCategorieItem", IsNullable = false)]
        public PweDocumentoPweDatiGeneraliPweDGCapitoliCategorieDGSubCategorieItem[] PweDGSubCategorie
        {
            get
            {
                return pweDGSubCategorieField;
            }
            set
            {
                pweDGSubCategorieField = value;
            }
        }
    }


}
