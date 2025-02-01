using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IUserRepository
    {
        Task<User> Authenticate(string UserName, string Password);

        void Register(string userName, string Password);

        Task<bool> UserAlreadyExists(string userName);




    }
}