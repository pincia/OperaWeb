using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OperaWeb.SharedClasses.Enums
{
  /// <summary>
  /// Represents the status of an organization member.
  /// </summary>
  public enum MemberStatus
  {
    Pending,  // The member is added but has not completed registration.
    Active,   // The member has completed registration and is active.
    Inactive  // The member is inactive or suspended.
  }
}
