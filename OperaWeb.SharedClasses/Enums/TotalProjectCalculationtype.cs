using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OperaWeb.SharedClasses.Enums
{
  public enum TotalProjectCalculationType
  {
    BaseAuctionWork = 1, // LAVORI A BASE D'ASTA
    AssignedWork = 2, // LAVORI AFFIDATI
    AssignedWorkAndAvailableFunds = 3, // LAVORI AFFIDATI + SOMME A DISPOSIZIONE
    BaseAuctionWorkAndAvailableFunds = 4 // LAVORI A BASE D'ASTA + SOMME A DISPOSIZIONE
  }
}
