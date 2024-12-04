namespace OperaWeb.SharedClasses.Helpers;
//
// Riepilogo:
//     This class is used to help in conversion for values received from database. In
//     fact, it intercepts null and DBNull values, forcing them to zero
public static class SafeConvert
{
    //
    // Riepilogo:
    //     Converts a db received value to the decimal equivalent. null and DBNull values
    //     are forced to zero. In case of exception, the returned value will be zero anyway
    //
    //
    // Parametri:
    //   val:
    //     An object containing the value to be converted
    //
    //   defaultValue:
    //     The value to be returned in case of null
    //
    //   provider:
    //     An object that supplies culture-specific formatting information (usually System.Globalization.CultureInfo.InvariantCulture)
    //
    //
    // Valori restituiti:
    //     The converted value, zero in case of failure
    public static decimal ToDecimal(object val, decimal defaultValue, IFormatProvider provider = null)
    {
        if (val == null || Convert.IsDBNull(val))
        {
            return defaultValue;
        }

        try
        {
            return provider == null ? Convert.ToDecimal(val) : Convert.ToDecimal(val, provider);
        }
        catch
        {
            return defaultValue;
        }
    }

    //
    // Riepilogo:
    //     Converts a db received value to the decimal equivalent. null and DBNull values
    //     are forced to zero. In case of exception, the returned value will be zero anyway
    //
    //
    // Parametri:
    //   val:
    //     An object containing the value to be converted
    //
    //   provider:
    //     An object that supplies culture-specific formatting information (usually System.Globalization.CultureInfo.InvariantCulture)
    //
    //
    // Valori restituiti:
    //     The converted value, zero in case of failure
    public static decimal ToDecimal(object val, IFormatProvider provider = null)
    {
        return ToDecimal(val, 0m, provider);
    }

    //
    // Riepilogo:
    //     Converts a db received value to a nullable decimal equivalent. null and DBNull
    //     values are forced to null. In case of exception, the returned value will be null
    //     anyway
    //
    // Parametri:
    //   val:
    //     An object containing the value to be converted
    //
    //   provider:
    //     An object that supplies culture-specific formatting information (usually System.Globalization.CultureInfo.InvariantCulture)
    //
    //
    // Valori restituiti:
    //     The converted value, null in case of failure
    public static decimal? ToNullableDecimal(object val, IFormatProvider provider = null)
    {
        if (val == null || Convert.IsDBNull(val))
        {
            return null;
        }

        try
        {
            return provider == null ? Convert.ToDecimal(val) : Convert.ToDecimal(val, provider);
        }
        catch
        {
            return null;
        }
    }

    //
    // Riepilogo:
    //     Converts a db received value to the integer equivalent. null and DBNull values
    //     are forced to the default value. In case of exception, the returned value will
    //     be the default value anyway
    //
    // Parametri:
    //   val:
    //     An object containing the value to be converted
    //
    //   defaultValue:
    //     The value to be returned in case of null
    //
    // Valori restituiti:
    //     The converted value
    public static int ToInt32(object val, int defaultValue)
    {
        if (val == null || Convert.IsDBNull(val))
        {
            return defaultValue;
        }

        try
        {
            return Convert.ToInt32(val);
        }
        catch
        {
            return defaultValue;
        }
    }

    //
    // Riepilogo:
    //     Converts a db received value to the integer equivalent. null and DBNull values
    //     are forced to zero. In case of exception, the returned value will be zero anyway
    //
    //
    // Parametri:
    //   val:
    //     An object containing the value to be converted
    //
    // Valori restituiti:
    //     The converted value, zero in case of failure
    public static int ToInt32(object val)
    {
        return ToInt32(val, 0);
    }

    //
    // Riepilogo:
    //     Converts a db received value to a nullable integer equivalent. null and DBNull
    //     values are forced to null. In case of exception, the returned value will be null
    //     anyway
    //
    // Parametri:
    //   val:
    //     An object containing the value to be converted
    //
    // Valori restituiti:
    //     The converted value, null in case of failure
    public static int? ToNullableInt32(object val)
    {
        if (val == null || Convert.IsDBNull(val))
        {
            return null;
        }

        try
        {
            return Convert.ToInt32(val);
        }
        catch
        {
            return null;
        }
    }

    //
    // Riepilogo:
    //     Converts a db received value to the integer equivalent. null and DBNull values
    //     are forced to zero. In case of exception, the returned value will be zero anyway
    //
    //
    // Parametri:
    //   val:
    //     An object containing the value to be converted
    //
    //   defaultValue:
    //     The value to be returned in case of null
    //
    // Valori restituiti:
    //     The converted value, zero in case of failure
    public static long ToInt64(object val, long defaultValue)
    {
        if (val == null || Convert.IsDBNull(val))
        {
            return defaultValue;
        }

        try
        {
            return Convert.ToInt64(val);
        }
        catch
        {
            return defaultValue;
        }
    }

    //
    // Riepilogo:
    //     Converts a db received value to the integer equivalent. null and DBNull values
    //     are forced to zero. In case of exception, the returned value will be zero anyway
    //
    //
    // Parametri:
    //   val:
    //     An object containing the value to be converted
    //
    // Valori restituiti:
    //     The converted value, zero in case of failure
    public static long ToInt64(object val)
    {
        return ToInt64(val, 0L);
    }

    //
    // Riepilogo:
    //     Converts a db received value to a nullable integer equivalent. null and DBNull
    //     values are forced to null. In case of exception, the returned value will be null
    //     anyway
    //
    // Parametri:
    //   val:
    //     An object containing the value to be converted
    //
    // Valori restituiti:
    //     The converted value, null in case of failure
    public static long? ToNullableInt64(object val)
    {
        if (val == null || Convert.IsDBNull(val))
        {
            return null;
        }

        try
        {
            return Convert.ToInt64(val);
        }
        catch
        {
            return null;
        }
    }

    //
    // Riepilogo:
    //     Converts a db received value to the boolean equivalent. null and DBNull values
    //     are forced to the default value. In case of exception, the returned value will
    //     be the default value anyway
    //
    // Parametri:
    //   val:
    //     An object containing the value to be converted
    //
    //   defaultValue:
    //     The default return value in case of conversion error
    //
    // Valori restituiti:
    //     The converted value, in case of failure defaultValue is returned
    public static bool ToBoolean(object val, bool defaultValue)
    {
        if (val == null || Convert.IsDBNull(val))
        {
            return defaultValue;
        }

        try
        {
            if (val is string && int.TryParse(val.ToString(), out var result))
            {
                return Convert.ToBoolean(result);
            }

            return Convert.ToBoolean(val);
        }
        catch
        {
            return defaultValue;
        }
    }

    //
    // Riepilogo:
    //     Converts a db received value to the boolean equivalent. null and DBNull values
    //     are forced to false. In case of exception, the returned value will be false anyway
    //
    //
    // Parametri:
    //   val:
    //     An object containing the value to be converted
    //
    // Valori restituiti:
    //     The converted value, false in case of failure
    public static bool ToBoolean(object val)
    {
        if (val == null || Convert.IsDBNull(val))
        {
            return false;
        }

        try
        {
            if (val is string && int.TryParse(val.ToString(), out var result))
            {
                return Convert.ToBoolean(result);
            }

            return Convert.ToBoolean(val);
        }
        catch
        {
            return false;
        }
    }

    //
    // Riepilogo:
    //     Converts a db received value to a boolean equivalent. null and DBNull values
    //     are forced to null. In case of exception, the returned value will be null anyway
    //
    //
    // Parametri:
    //   val:
    //     An object containing the value to be converted
    //
    // Valori restituiti:
    //     The converted value, null in case of failure
    public static bool? ToNullableBoolean(object val)
    {
        if (val == null || Convert.IsDBNull(val))
        {
            return null;
        }

        try
        {
            if (val is string && int.TryParse(val.ToString(), out var result))
            {
                return Convert.ToBoolean(result);
            }

            return Convert.ToBoolean(val);
        }
        catch
        {
            return null;
        }
    }

    //
    // Riepilogo:
    //     Converts a db received value to a DateTime equivalent. null and DBNull values
    //     are forced to null. In case of exception, the returned value will be null anyway
    //
    //
    // Parametri:
    //   val:
    //     An object containing the value to be converted
    //
    //   defaultValue:
    //     The value to return in case the date cannot be converted
    //
    //   provider:
    //     An object that supplies culture-specific formatting information (usually System.Globalization.CultureInfo.InvariantCulture)
    //
    //
    // Valori restituiti:
    //     The converted value, null in case of failure
    public static DateTime ToDate(object val, DateTime defaultValue, IFormatProvider provider = null)
    {
        if (val == null || Convert.IsDBNull(val))
        {
            return defaultValue;
        }

        try
        {
            return provider == null ? Convert.ToDateTime(val) : Convert.ToDateTime(val, provider);
        }
        catch
        {
            return defaultValue;
        }
    }

    //
    // Riepilogo:
    //     Converts a db received value to a DateTime equivalent. null and DBNull values
    //     are forced to null. In case of exception, the returned value will be null anyway
    //
    //
    // Parametri:
    //   val:
    //     An object containing the value to be converted
    //
    // Valori restituiti:
    //     The converted value, null in case of failure
    public static DateTime? ToNullableDate(object val, IFormatProvider provider = null)
    {
        if (val == null || Convert.IsDBNull(val))
        {
            return null;
        }

        try
        {
            return provider == null ? Convert.ToDateTime(val) : Convert.ToDateTime(val, provider);
        }
        catch
        {
            return null;
        }
    }

    //
    // Riepilogo:
    //     Converts a db received value to the string equivalent. null and DBNull values
    //     are forced to System.String.Empty
    //
    // Parametri:
    //   val:
    //     An object containing the value to be converted
    //
    // Valori restituiti:
    //     The converted value, empty string in case of failure
    public static string ToString(object val)
    {
        if (val == null || Convert.IsDBNull(val))
        {
            return string.Empty;
        }

        return val.ToString();
    }
}
