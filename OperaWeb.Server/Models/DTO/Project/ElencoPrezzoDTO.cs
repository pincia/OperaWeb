﻿namespace OperaWeb.Server.Models.DTO.Project
{
  public class ElencoPrezzoDTO
  {
    public int ID { get; set; }
    public int IDEP { get; set; }
    public int TipoEP { get; set; }

    public string? Tariffa { get; set; }

    public string? Articolo { get; set; }

    public string? DesRidotta { get; set; }

    public string? DesEstesa { get; set; }

    public string? DesBreve { get; set; }

    public string? UnMisura { get; set; }

    public decimal Prezzo1 { get; set; }

    public decimal Prezzo2 { get; set; }

    public decimal Prezzo3 { get; set; }

    public decimal Prezzo4 { get; set; }

    public decimal Prezzo5 { get; set; }
    public int? SuperCapID { get; set; }
    public int CapID { get; set; }
    public int SubCapID { get; set; }
    public int Flags { get; set; }

    public DateTime Data { get; set; }

    public string? AdrInternet { get; set; }

    public string? PweEPAnalisi { get; set; }

    public int ProjectID { get; set; }
  }
}