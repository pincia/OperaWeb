namespace OperaWeb.Server.Models.XPVE
{

    // NOTA: con il codice generato potrebbe essere richiesto almeno .NET Framework 4.5 o .NET Core/Standard 2.0.
    /// <remarks/>
    [Serializable()]
    [System.ComponentModel.DesignerCategory("code")]
    public partial class PweDocumento
    {

        private string copyRightField;

        private int tipoDocumentoField;

        private string tipoFormatoField;

        private decimal versioneField;

        private string sourceVersioneField;

        private string sourceNomeField;

        private string fileNameDocumentoField;

        private PweDocumentoPweDatiGenerali pweDatiGeneraliField;

        private PweDocumentoPweMisurazioni pweMisurazioniField;

        /// <remarks/>
        public string CopyRight
        {
            get
            {
                return copyRightField;
            }
            set
            {
                copyRightField = value;
            }
        }

        /// <remarks/>
        public int TipoDocumento
        {
            get
            {
                return tipoDocumentoField;
            }
            set
            {
                tipoDocumentoField = value;
            }
        }

        /// <remarks/>
        public string TipoFormato
        {
            get
            {
                return tipoFormatoField;
            }
            set
            {
                tipoFormatoField = value;
            }
        }

        /// <remarks/>
        public decimal Versione
        {
            get
            {
                return versioneField;
            }
            set
            {
                versioneField = value;
            }
        }

        /// <remarks/>
        public string SourceVersione
        {
            get
            {
                return sourceVersioneField;
            }
            set
            {
                sourceVersioneField = value;
            }
        }

        /// <remarks/>
        public string SourceNome
        {
            get
            {
                return sourceNomeField;
            }
            set
            {
                sourceNomeField = value;
            }
        }

        /// <remarks/>
        public string FileNameDocumento
        {
            get
            {
                return fileNameDocumentoField;
            }
            set
            {
                fileNameDocumentoField = value;
            }
        }

        /// <remarks/>
        public PweDocumentoPweDatiGenerali PweDatiGenerali
        {
            get
            {
                return pweDatiGeneraliField;
            }
            set
            {
                pweDatiGeneraliField = value;
            }
        }

        /// <remarks/>
        public PweDocumentoPweMisurazioni PweMisurazioni
        {
            get
            {
                return pweMisurazioniField;
            }
            set
            {
                pweMisurazioniField = value;
            }
        }
    }
}
