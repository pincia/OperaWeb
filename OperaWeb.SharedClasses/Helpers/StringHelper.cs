using System.Xml;

namespace OperaWeb.SharedClasses.Helpers;

/// <summary>
/// Class for string manipulation
/// </summary>
public static class StringHelper
{
  /// <summary>
  /// Removes Invalid chars from xml string
  /// </summary>
  /// <param name="text"></param>
  /// <returns></returns>
  public static string RemoveInvalidXmlChars(string text)
  {
    var validXmlChars = text.Where(ch => XmlConvert.IsXmlChar(ch)).ToArray();
    return new string(validXmlChars);
  }

}