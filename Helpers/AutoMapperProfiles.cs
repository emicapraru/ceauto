using AutoMapper;
using WebAPI.Dtos;
using WebAPI.Models;

namespace WebAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<City, CityDto>().ReverseMap();//ReverseMap e folosit si pentru maparea din cityDto in City
            CreateMap<City, CityUpdateDto>().ReverseMap();
        }
    }
}