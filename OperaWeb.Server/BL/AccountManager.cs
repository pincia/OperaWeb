using OperaWeb.Server.DataClasses.Models;
using OperaWeb.Server.DataClasses.Context;
using OperaWeb.Server.DataClasses.Context;
using OperaWeb.Server.Repository.Models;
namespace OperaWeb.Server.BL
{
    /// <summary>
    /// Account business logic class
    /// </summary>
    public class AccountManager
    {

        public AccountManager() { }

        /// <summary>
        /// Create new user if not exists
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public bool CreateUser(OldUser user)
        {
            try
            {
                //using (var context = new OperaWebDbContext())
                //{
                //    if (context.Users.Any(user=>user.Email == user.Email))
                //    {
                //        return false;
                //    }
                  
                //    context.Users.Add(user);
                //    context.SaveChanges();
                //}
            }
            catch (Exception ex) 
            {
                return false;
            }

            return true;
        }

        /// <summary>
        /// Deletes user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public bool DeleteUser(int userId)
        {
            try
            {
                //using (var context = new OperaWebDbContext())
                //{
                //    var user = context.Users.FirstOrDefault(user=>user.Id == userId);
                //    if (user == null)
                //    {
                //        return false;
                //    }

                //    context.Users.Remove(user);
                //    context.SaveChanges();
                //}
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }
         
        /// <summary>
        /// Check for user with credentials
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public OldUser CheckDBCredentials(string userName, string password)
        {
            OldUser user = null;
            //try
            //{
            //    using (var context = new OperaWebDbContext())
            //    {
            //        user = context.Users.FirstOrDefault(user => user.Email == userName && user.Password == password);
            //    }
            //}
            //catch (Exception ex)
            //{
            //    return user;
            //}

            return user;
        }

        public OnlineUser CheckOnlineCredentials(string userName, string password)
        {
            return null;
        }
        
        /// <summary>
        /// Imports online user to app DB
        /// </summary>
        /// <param name="onlineUser"></param>
        /// <returns></returns>
        public OldUser ImportOnlineUser(OnlineUser onlineUser)
        {
            return null;
        }
    }
}
