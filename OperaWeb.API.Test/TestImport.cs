﻿using Microsoft.EntityFrameworkCore;
using OperaWeb.Server.Services.BLL;
using OperaWeb.Server.DataClasses.Context;
using OperaWeb.Server.DataClasses.Models;
using System.IO;
using System.Linq;
using Xunit;
using File = System.IO.File;

namespace OperaWeb.API.Test
{
  public class TestImport
  {
    private string Xml = @"";

    private OperaWebDbContext _context;

    private ProjectServiceManager _manager;

    private string _currentPath;
    public TestImport()
    {
      DbContextOptions<OperaWebDbContext> options;
      var builder = new DbContextOptionsBuilder<OperaWebDbContext>();
      builder.UseInMemoryDatabase<OperaWebDbContext>("OperaWeb");
      options = builder.Options;
      _context = new OperaWebDbContext(options, null);
      _manager = new ProjectServiceManager(_context, null,null,null);
      var currentSplittedPath = System.IO.Path.GetDirectoryName(Environment.GetCommandLineArgs()[0]).Split('\\');
      _currentPath = String.Join(@"\", currentSplittedPath.Take(currentSplittedPath.Length - 3));
    }


    [Fact]
    public void TestXmlImport_is_correct()
    {
      var newProject = new Project()
      {
        Object = "TEST PROGETTO",
        Province = "TEST",
        City = "TEST",
      };
      
      var lines = File.ReadAllLines(_currentPath + "\\XPVE\\test.xpve");
      var xmlString =  String.Join("", lines.Skip(1));

      _manager.ImportProjectDataAsync(xmlString, newProject,"");
    }
  }
}
