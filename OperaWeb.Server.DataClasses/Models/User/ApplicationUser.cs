using Microsoft.AspNetCore.Identity;
using System.Diagnostics.CodeAnalysis;
namespace OperaWeb.Server.DataClasses.Models.User
{
    public class ApplicationUser : IdentityUser
    {
        // Token di verifica e reset
        public string? VerificationToken { get; set; }
        public DateTime? VerifiedAt { get; set; }
        public string? ResetToken { get; set; }
        public DateTime? ResetTokenExpiresAt { get; set; }
        public DateTime? PasswordReset { get; set; }

        // Relazione con Comune
        public int? ComuneId { get; set; } // FK opzionale
        public virtual Comune Comune { get; set; }

        // Relazione con Provincia
        public int? ProvinciaId { get; set; } // FK opzionale
        public virtual Provincia Provincia { get; set; }

        // Relazione con SubRole
        public int? SubRoleId { get; set; } // FK opzionale
        public virtual SubRole SubRole { get; set; }

        // Dati personali
        public string? FirstName { get; set; } // Nome
        public string? LastName { get; set; }  // Cognome
        public string? FullName { get; set; }
        public string? MobileNumber { get; set; } // Telefono mobile
        public string? AlternateEmail { get; set; } // Email alternativa
        public string? Address { get; set; }   // Indirizzo
        public string? City { get; set; }      // Città

        public string? PostalCode { get; set; } // CAP
        public string? Country { get; set; }    // Nazione
        public string? TaxCode { get; set; }    // Codice Fiscale

        // Dati aziendali
        public string? RagioneSociale { get; set; } // Ragione Sociale
        public string? PIVA { get; set; } // Partita IVA
        public string? CompanyTaxCode { get; set; } // Codice fiscale aziendale
        public string? CompanyAddress { get; set; } // Indirizzo aziendale
        public int? CompanyComuneId { get; set; }
        public int? CompanyProvinciaId { get; set; }
        public virtual Comune CompanyComune { get; set; }
        public virtual Provincia CompanyProvincia { get; set; }
        public string? CompanyPostalCode { get; set; } // CAP aziendale
        public string? CompanyCountry { get; set; }  // Nazione aziendale
        public string? CompanyPhoneNumber { get; set; } // Telefono aziendale
        public string? CompanyEmail { get; set; }     // Email aziendale
        public string? CompanyWebsite { get; set; }   // Sito web aziendale
        public string? SDICode { get; set; }          // Codice SDI (fatturazione elettronica)
        public string? PEC { get; set; }              // Posta Elettronica Certificata
        public string? CompanyType { get; set; }      // Tipo di azienda (es. SRL, SPA, ecc.)
        public bool MustChangePassword { get; set; }

    }
}
