
using Azure.Core;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using OperaWeb.Server.DataClasses.Context;
using OperaWeb.Server.DataClasses.Models;
using System;
using System.Data;
using System.Security.Claims;
using Newtonsoft.Json;
using File = System.IO.File;
using OperaWeb.Server.DataClasses.DTO;
using OperaWeb.Server.Models;
using OperaWeb.Server.DataClasses.Models.User;
using Task = System.Threading.Tasks.Task;
namespace OperaWeb.Server.DataClasses.Context
{
  public class OperaWebDbContextInitialiser
  {
    private readonly ILogger<OperaWebDbContextInitialiser> _logger;
    private readonly OperaWebDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public OperaWebDbContextInitialiser(ILogger<OperaWebDbContextInitialiser> logger, OperaWebDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
      _logger = logger;
      _context = context;
      _userManager = userManager;
      _roleManager = roleManager;
    }

    public object JsonConvert { get; private set; }

    public async Task InitialiseAsync()
    {
      try
      {
        if (_context.Database.IsSqlServer())
        {
          await _context.Database.MigrateAsync();
        }
      }
      catch (Exception ex)
      {

        _logger.LogError(ex, "An error occurred while initialising the database.");
        throw;
      }
    }
    public async Task SeedAsync()
    {
      try
      {
        await TrySeedAsync();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "An error occurred while seeding the database.");
        throw;
      }
    }

    public async Task TrySeedAsync()
    {
      // Crea un elenco di ruoli da aggiungere
      var roles = new List<string> { "Admin", "Committente", "Professionista", "Impresa", "OrganizationMember" };

      var addedRoles = new List<IdentityRole>();

      foreach (var role in roles)
      {
        if (!await _roleManager.RoleExistsAsync(role))
        {
          var res = await _roleManager.CreateAsync(new IdentityRole(role));
        }
      }

      //SubRoles
      var subRoles = new List<string>
{
    "PA",
    "Privato",
    "Ingegnere",
    "Architetto",
    "Geometra",
    "Geologo",
    "Società Per Azioni",
    "Società a Responsabilità Limitata",
    "Società in Nome Collettivo",
    "Società Semplice",
    "Società in Accomandita Semplice",
    "Società in Accomandita per Azioni",
    "Impresa Individuale",
    "Lavoratore Autonomo o Libero Professionista",
    "Studio Associato o Società di Professionisti",
    "Società Cooperativa",
    "Organizzazione non lucrativa di utilità sociale",
    "Consorzio",
    "Società consortile",
    "Ente Pubblico",
    "Società di fatto",
    "Forma giuridica estera",
    "Altre"
};

      var actualSubRoles = _context.SubRoles.ToList();

      foreach (var role in subRoles)
      {
        if (!actualSubRoles.Exists(S => S.Name == role))
        {
          var res = _context.SubRoles.Add(new Models.User.SubRole() { Name = role });

          var committenti = new List<string>
{
    "PA",
    "Privato" };

          if (committenti.Contains(role))
          {
            _context.RoleSubRoles.Add(new RoleSubRole() { SubRole = res.Entity, Role = await _roleManager.FindByNameAsync("Committente") });
          }
          var professionisti = new List<string>
{
    "Ingegnere",
    "Architetto",
    "Geometra",
    "Geologo"
};

          if (professionisti.Contains(role))
          {
            _context.RoleSubRoles.Add(new RoleSubRole() { SubRole = res.Entity, Role = await _roleManager.FindByNameAsync("Professionista") });
          }

          var imprese = new List<string>
{
    "Società Per Azioni",
    "Società a Responsabilità Limitata",
    "Società in Nome Collettivo",
    "Società Semplice",
    "Società in Accomandita Semplice",
    "Società in Accomandita per Azioni",
    "Impresa Individuale",
    "Lavoratore Autonomo o Libero Professionista",
    "Studio Associato o Società di Professionisti",
    "Società Cooperativa",
    "Organizzazione non lucrativa di utilità sociale",
    "Consorzio",
    "Società consortile",
    "Ente Pubblico",
    "Società di fatto",
    "Forma giuridica estera",
    "Altre"
};

          if (imprese.Contains(role))
          {
            _context.RoleSubRoles.Add(new RoleSubRole() { SubRole = res.Entity, Role = await _roleManager.FindByNameAsync("Impresa") });
          }
        }
      }

      //Soa 
      var soa = _context.Soas.ToList();

      if (soa.Count == 0)
      {
        _context.Soas.Add(new Models.Soa() { Code = "", Description = "Nessuna" });
        _context.Soas.Add(new Models.Soa() { Code = "G1", Description = "Edifici civili e industriali" });
        _context.Soas.Add(new Models.Soa() { Code = "G2", Description = "Restauro e manutenzione dei beni immobili sottoposti a tutela" });
        _context.Soas.Add(new Models.Soa() { Code = "G3", Description = "Strade, autostrade, ponti, viadotti, ferrovie, metropolitane" });
        _context.Soas.Add(new Models.Soa() { Code = "G4", Description = "Opere d\"arte nel sottosuolo" });
        _context.Soas.Add(new Models.Soa() { Code = "G5", Description = "Dighe" });
        _context.Soas.Add(new Models.Soa() { Code = "G6", Description = "Acquedotti, gasdotti, oleodotti, opere di irrigazione e di evacuazione" });
        _context.Soas.Add(new Models.Soa() { Code = "G7", Description = "Opere marittime e lavori di dragaggio" });
        _context.Soas.Add(new Models.Soa() { Code = "G8", Description = "Opere fluviali, di difesa, di sistemazione idraulica e di bonifica" });
        _context.Soas.Add(new Models.Soa() { Code = "G9", Description = "Impianti per la produzione di energia elettrica" });
        _context.Soas.Add(new Models.Soa() { Code = "OG10", Description = "Impianti per la trasformazione alta/media tensione e per la distribuzione di energia elettrica in corrente alternata e continua ed impianti di pubblica illuminazione" });
        _context.Soas.Add(new Models.Soa() { Code = "OG11", Description = "Impianti tecnologici" });
        _context.Soas.Add(new Models.Soa() { Code = "OG12", Description = "Opere ed impianti di bonifica e protezione ambientale" });
        _context.Soas.Add(new Models.Soa() { Code = "OG13", Description = "Opere di ingegneria naturalistica" });
        _context.Soas.Add(new Models.Soa() { Code = "OS1", Description = "Lavori in terra" });
        _context.Soas.Add(new Models.Soa() { Code = "OS2-A", Description = "Superfici decorate di beni immobili del patrimonio culturale e beni culturali mobili di interesse storico, artistico, archeologico ed etnoantropologico" });
        _context.Soas.Add(new Models.Soa() { Code = "OS2-B", Description = "Beni culturali mobili di interesse archivistico e librario" });
        _context.Soas.Add(new Models.Soa() { Code = "OS3", Description = "Impianti idrico-sanitario, cucine, lavanderie" });
        _context.Soas.Add(new Models.Soa() { Code = "OS4", Description = "Impianti elettromeccanici trasportatori" });
        _context.Soas.Add(new Models.Soa() { Code = "OS5", Description = "Impianti pneumatici e antintrusione" });
        _context.Soas.Add(new Models.Soa() { Code = "OS6", Description = "Finiture di opere generali in materiali lignei, plastici, metallici e vetrosi" });
        _context.Soas.Add(new Models.Soa() { Code = "OS7", Description = "Finiture di opere generali di natura edile e tecnica" });
        _context.Soas.Add(new Models.Soa() { Code = "OS8", Description = "Opere di impermeabilizzazione" });
        _context.Soas.Add(new Models.Soa() { Code = "OS9", Description = "Impianti per la segnaletica luminosa e la sicurezza del traffico" });
        _context.Soas.Add(new Models.Soa() { Code = "OS10", Description = "Segnaletica stradale non luminosa" });
        _context.Soas.Add(new Models.Soa() { Code = "OS11", Description = "Apparecchiature strutturali speciali" });
        _context.Soas.Add(new Models.Soa() { Code = "OS12-A", Description = "Barriere stradali di sicurezza" });
        _context.Soas.Add(new Models.Soa() { Code = "OS12-B", Description = "Barriere paramassi, fermaneve e simili" });
        _context.Soas.Add(new Models.Soa() { Code = "OS13", Description = "Strutture prefabbricate in cemento armato" });
        _context.Soas.Add(new Models.Soa() { Code = "OS14", Description = "Impianti di smaltimento e recupero rifiuti" });
        _context.Soas.Add(new Models.Soa() { Code = "OS15", Description = "Pulizia di acque marine, lacustri, fluviali" });
        _context.Soas.Add(new Models.Soa() { Code = "OS16", Description = "Impianti per centrali produzione energia elettrica" });
        _context.Soas.Add(new Models.Soa() { Code = "OS17", Description = "Linee telefoniche ed impianti di telefonia" });
        _context.Soas.Add(new Models.Soa() { Code = "OS18-A", Description = "Componenti strutturali in acciaio" });
        _context.Soas.Add(new Models.Soa() { Code = "OS18-B", Description = "Componenti per facciate continue" });
        _context.Soas.Add(new Models.Soa() { Code = "OS19", Description = "Impianti di reti di telecomunicazione e di trasmissioni e trattamento" });
        _context.Soas.Add(new Models.Soa() { Code = "OS20-A", Description = "Rilevamenti topografici" });
        _context.Soas.Add(new Models.Soa() { Code = "OS20-B", Description = "Indagini geognostiche" });
        _context.Soas.Add(new Models.Soa() { Code = "OS21", Description = "Opere strutturali speciali" });
        _context.Soas.Add(new Models.Soa() { Code = "OS22", Description = "Impianti di potabilizzazione e depurazione" });
        _context.Soas.Add(new Models.Soa() { Code = "OS23", Description = "Demolizione di opere" });
        _context.Soas.Add(new Models.Soa() { Code = "OS24", Description = "Verde e arredo urbano" });
        _context.Soas.Add(new Models.Soa() { Code = "OS25", Description = "Scavi archeologici" });
        _context.Soas.Add(new Models.Soa() { Code = "OS26", Description = "Pavimentazioni e sovrastrutture speciali" });
        _context.Soas.Add(new Models.Soa() { Code = "OS27", Description = "Impianti per la trazione elettrica" });
        _context.Soas.Add(new Models.Soa() { Code = "OS28", Description = "Impianti termici e di condizionamento" });
        _context.Soas.Add(new Models.Soa() { Code = "OS29", Description = "Armamento ferroviario" });
        _context.Soas.Add(new Models.Soa() { Code = "OS30", Description = "Impianti interni elettrici, telefonici, radiotelefonici e televisivi" });
        _context.Soas.Add(new Models.Soa() { Code = "OS31", Description = "Impianti per la mobilità sospesa" });
        _context.Soas.Add(new Models.Soa() { Code = "OS32", Description = "Strutture in legno" });
        _context.Soas.Add(new Models.Soa() { Code = "OS33", Description = "Coperture speciali" });
        _context.Soas.Add(new Models.Soa() { Code = "OS34", Description = "Sistemi antirumore per infrastrutture di mobilità" });
        _context.Soas.Add(new Models.Soa() { Code = "OS35", Description = "Interventi a basso impatto ambientale" });

      }

      //soas classifications
      var soaclassifications = _context.SoaClassifications.ToList();

      if (soaclassifications.Count == 0)
      {
        _context.SoaClassifications.Add(new Models.SoaClassification() { Code = "", Description = "Nessuna" });
        _context.SoaClassifications.Add(new Models.SoaClassification() { Code = "I", Description = "Classificazione I" });
        _context.SoaClassifications.Add(new Models.SoaClassification() { Code = "II", Description = "Classificazione II" });
        _context.SoaClassifications.Add(new Models.SoaClassification() { Code = "III", Description = "Classificazione III" });
        _context.SoaClassifications.Add(new Models.SoaClassification() { Code = "III bis", Description = "Classificazione III bis" });
        _context.SoaClassifications.Add(new Models.SoaClassification() { Code = "IV", Description = "Classificazione IV" });
        _context.SoaClassifications.Add(new Models.SoaClassification() { Code = "IV bis", Description = "Classificazione IV bis" });
        _context.SoaClassifications.Add(new Models.SoaClassification() { Code = "V", Description = "Classificazione V" });
        _context.SoaClassifications.Add(new Models.SoaClassification() { Code = "VI", Description = "Classificazione VI" });
        _context.SoaClassifications.Add(new Models.SoaClassification() { Code = "VII", Description = "Classificazione VII" });
        _context.SoaClassifications.Add(new Models.SoaClassification() { Code = "VIII", Description = "Classificazione VIII" });
      }

      // Default users
      var administrator = new ApplicationUser { UserName = "admin@test.it", Email = "admin@test.it" };

      if (_userManager.Users.All(u => u.UserName != administrator.UserName))
      {
        var result = await _userManager.CreateAsync(administrator, "Admin2024!");
        var newUser = _context.Users.Where(u => u.Email == administrator.Email).FirstOrDefault();
        newUser.EmailConfirmed = true;

      }

      //Comuni e province

      if (!_context.Province.Any() && !_context.Comuni.Any()) // Controlla se i dati esistono già
      {
        var baseDirectory = AppDomain.CurrentDomain.BaseDirectory;
        // Recupera la directory radice dell'app
        var seedFilesDirectory = Path.Combine(baseDirectory, "SeedFiles");

        // Percorsi assoluti dei file
        var provinceFilePath = Path.Combine(seedFilesDirectory, "gi_province.json");
        var comuniFilePath = Path.Combine(seedFilesDirectory, "gi_comuni.json");
        // Leggi i file JSON
        var provinceJson = await File.ReadAllTextAsync(provinceFilePath);
        var comuniJson = await File.ReadAllTextAsync(comuniFilePath);

        // Deserializza in oggetti
        var provinceDto = Newtonsoft.Json.JsonConvert.DeserializeObject<List<ProvinciaDTO>>(provinceJson);
        var comuniDto = Newtonsoft.Json.JsonConvert.DeserializeObject<List<ComuneDTO>>(comuniJson);

        // Mappa ProvinceDTO alla tua classe Provincia
        var province = provinceDto.Select(p => new Provincia
        {
          Nome = p.DenominazioneProvincia,
          Sigla = p.SiglaProvincia
        }).ToList();

        _context.Province.AddRange(province);
        await _context.SaveChangesAsync();

        foreach (var comuneDto in comuniDto)
        {
          var provincia = _context.Province
                 .Where(p => p.Sigla == comuneDto.SiglaProvincia)
                 .FirstOrDefault(); // Associa l'ID della provincia
          var newComune = new Comune()
          {
            Nome = comuneDto.DenominazioneIta,
            Provincia = provincia,
            SiglaProvincia = provincia.Sigla
          };
          _context.Comuni.AddRange(newComune);
        }

        await _context.SaveChangesAsync();

      }

      // Seeding degli OrganizationRoles
      var organizationRoles = new List<(string Name, string RoleType, string ParentRole)>
    {
        // Committente
        ("Dirigente/Responsabile Ufficio Tecnico", "Committente","Organization"),
        ("Responsabile unico del procedimento (RUP)", "Committente", "Dirigente/Responsabile Ufficio Tecnico"),
        ("General contractor", "Committente", "Dirigente/Responsabile Ufficio Tecnico"),
        ("Procuratore", "Committente", "Dirigente/Responsabile Ufficio Tecnico"),
        ("Rappresentante dell'avente titolo", "Committente", "Dirigente/Responsabile Ufficio Tecnico"),

        // Imprese
        ("Rappresentante Legale", "Impresa", "Organization"),
        ("Datore di Lavoro", "Impresa", "Rappresentante Legale"),
        ("Direttore tecnico di cantiere", "Impresa", "Rappresentante Legale"),
        ("Medico Competente", "Impresa", "Rappresentante Legale"),
        ("Responsabile del Servizio di Prevenzione e Protezione", "Impresa", "Rappresentante Legale"),
        ("Addetto al Servizio di Prevenzione e Protezione", "Impresa", "Rappresentante Legale"),
        ("Rappresentante dei Lavoratori per la Sicurezza", "Impresa", "Rappresentante Legale"),
        ("Rappresentante dei Lavoratori per la Sicurezza Territoriale", "Impresa", "Rappresentante Legale"),

        //Organization
        ("Organization","Impresa,Committente","")
    };

      _context.SaveChanges();

      //Project Subject Roles
      var projectSubjectRoles = new List<string>
{
    "Committente",
    "Responsabile lavori",
    "Certificatore energetico",
    "Collaudatore",
    "Coordinatore della progettazione strutturale",
    "Coordinatore per la sicurezza in fase di esecuzione",
    "Coordinatore per la sicurezza in fase di progettazione",
    "Co-Progettista",
    "Direttore Lavori acciaio",
    "Direttore lavori architettonico",
    "Direttore Lavori CAO",
    "Direttore Lavori CAP",
    "Direttore lavori impianti",
    "Direttore Lavori muratura",
    "Direttore lavori strutture",
    "Estensore della perizia",
    "Geologo",
    "Incaricato Presentazione NP",
    "Professionista incaricato prestazioni specialistiche",
    "Professionista incaricato redazione Schede AeDES",
    "Progettista architettonico",
    "Progettista degli impianti",
    "Progettista impianti elettrici",
    "Progettista impianti termici",
    "Progettista incaricato altre progettazioni (agroindustriali, agroturistiche, zootecniche, ecc.)",
    "Progettista responsabile dell'ETC",
    "Progettista strutture",
    "Progettista Strutture acciaio",
    "Progettista Strutture CAO",
    "Progettista Strutture CAP",
    "Progettista Strutture muratura",
    "Tecnico incaricato Agibilità",
    "Tecnico incaricato Fine Lavori e Collaudo",
    "Impresa Affidataria",
    "Impresa Appaltatrice",
    "Impresa Subappaltatrice",
    "Impresa fornitrice",
    "Lavoratore Autonomo"
};

      var actualProjectSubjectRoles = _context.ProjectSubjectRoles.ToList();


      foreach (var role in projectSubjectRoles)
      {
        if (!actualProjectSubjectRoles.Exists(S => S.Name == role))
        {
          var res = _context.ProjectSubjectRoles.Add(new ProjectSubjectRole() { Name = role });

          var committenti = new List<string>
{
    "Committente",
    "Responsabile lavori" };

          if (committenti.Contains(role))
          {
            _context.RoleProjectRoles.Add(new RoleProjectSubjectRole() { ProjectRole = res.Entity, Role = await _roleManager.FindByNameAsync("Committente") });
          }
          var professionisti = new List<string>
{
    "Certificatore energetico",
    "Collaudatore",
    "Coordinatore della progettazione strutturale",
    "Coordinatore per la sicurezza in fase di esecuzione",
    "Coordinatore per la sicurezza in fase di progettazione",
    "Co-Progettista",
    "Direttore Lavori acciaio",
    "Direttore lavori architettonico",
    "Direttore Lavori CAO",
    "Direttore Lavori CAP",
    "Direttore lavori impianti",
    "Direttore Lavori muratura",
    "Direttore lavori strutture",
    "Estensore della perizia",
    "Geologo",
    "Incaricato Presentazione NP",
    "Professionista incaricato prestazioni specialistiche",
    "Professionista incaricato redazione Schede AeDES",
    "Progettista architettonico",
    "Progettista degli impianti",
    "Progettista impianti elettrici",
    "Progettista impianti termici",
    "Progettista incaricato altre progettazioni (agroindustriali, agroturistiche, zootecniche, ecc.)",
    "Progettista responsabile dell'ETC",
    "Progettista strutture",
    "Progettista Strutture acciaio",
    "Progettista Strutture CAO",
    "Progettista Strutture CAP",
    "Progettista Strutture muratura",
    "Tecnico incaricato Agibilità",
    "Tecnico incaricato Fine Lavori e Collaudo"
};

          if (professionisti.Contains(role))
          {
            _context.RoleProjectRoles.Add(new RoleProjectSubjectRole()
            {
              ProjectRole = res.Entity,
              Role = await _roleManager.FindByNameAsync("Professionista")
            });
          }

          var imprese = new List<string>
{
       "Impresa Affidataria",
    "Impresa Lavori",
    "Impresa fornitrice",
    "Lavoratore Autonomo"
};

          if (imprese.Contains(role))
          {
            _context.RoleProjectRoles.Add(new RoleProjectSubjectRole()
            {
              ProjectRole = res.Entity,
              Role = await _roleManager.FindByNameAsync("Impresa")
            });
          }
        }
      }
      _context.SaveChanges();

      var existingRoles = _context.OrganizationRoles.ToList();

      foreach (var (name, roleTypes, parentRole) in organizationRoles)
      {
        if (!existingRoles.Any(r => r.Name == name))
        {
          var parent = string.IsNullOrEmpty(parentRole) ? null : _context.OrganizationRoles.FirstOrDefault(r => r.Name == parentRole);

          var role = new Models.OrganizationRole
          {
            Name = name,
            ParentRole = parent
          };

          var res = _context.OrganizationRoles.Add(role);
          _context.SaveChanges();

          var roleTypesArray = roleTypes.Split(',');

          foreach (var roleName in roleTypesArray)
          {
            var organizationRole = res.Entity;
            var roleType = await _roleManager.FindByNameAsync(roleName);

            var mapping = new IdentityRoleOrganizationRoleMapping()
            {
              OrganizationRole = organizationRole,
              IdentityRole = roleType
            };

            _context.Add(mapping);
            _context.SaveChanges();
          }
        }
      }
    }
  }
}