namespace OperaWeb.Server.Models.XPVE
{
    /// <remarks/>
    [Serializable()]
    [System.ComponentModel.DesignerCategory("code")]
    public partial class PweDocumentoPweDatiGenerali
    {

        private PweDocumentoPweDatiGeneraliPweDGProgetto pweDGProgettoField;

        private PweDocumentoPweDatiGeneraliPweDGCapitoliCategorie pweDGCapitoliCategorieField;

        private PweDocumentoPweDatiGeneraliPweDGModuli pweDGModuliField;

        private PweDocumentoPweDatiGeneraliPweDGConfigurazione pweDGConfigurazioneField;

        /// <remarks/>
        public PweDocumentoPweDatiGeneraliPweDGProgetto PweDGProgetto
        {
            get
            {
                return pweDGProgettoField;
            }
            set
            {
                pweDGProgettoField = value;
            }
        }

        /// <remarks/>
        public PweDocumentoPweDatiGeneraliPweDGCapitoliCategorie PweDGCapitoliCategorie
        {
            get
            {
                return pweDGCapitoliCategorieField;
            }
            set
            {
                pweDGCapitoliCategorieField = value;
            }
        }

        /// <remarks/>
        public PweDocumentoPweDatiGeneraliPweDGModuli PweDGModuli
        {
            get
            {
                return pweDGModuliField;
            }
            set
            {
                pweDGModuliField = value;
            }
        }

        /// <remarks/>
        public PweDocumentoPweDatiGeneraliPweDGConfigurazione PweDGConfigurazione
        {
            get
            {
                return pweDGConfigurazioneField;
            }
            set
            {
                pweDGConfigurazioneField = value;
            }
        }
    }


}
