﻿using Gifter.Data;
using Gifter.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gifter.Repositories
{
    public class UserProfileRepository
    {
        private readonly ApplicationDbContext _context;

        public UserProfileRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<UserProfile> GetAll()
        {
            return _context.UserProfile
                           .ToList();
        }

        public UserProfile GetById(int id)
        {
            return _context.UserProfile
                           .FirstOrDefault(u => u.Id == id);
        }

        //public List<UserProfile> GetByUserProfileId(int id)
        //{
        //    return _context.UserProfile.Include(p => p.UserProfile)
        //                        .Where(p => p.UserProfileId == id)
        //                        .OrderBy(p => p.Title)
        //                        .ToList();
        //}

        public void Add(UserProfile userProfile)
        {
            _context.Add(userProfile);
            _context.SaveChanges();
        }

        public void Update(UserProfile userProfile)
        {
            _context.Entry(userProfile).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var userProfile = GetById(id);
            _context.UserProfile.Remove(userProfile);
            _context.SaveChanges();
        }
    }
}
