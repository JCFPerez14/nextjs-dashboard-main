"use client";

import Link from 'next/link';
import React from 'react';
import { SignOut } from './sign-out';

export default function Navbar() {
    return (
      <nav className="bg-gray-800 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">
            <Link href="/">Student Discipline Office</Link>
          </div>
          <ul className="flex space-x-4 justify-center items-center">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/Add-Students">Add Students</Link>
            </li>
            <li>
              <Link href="/new-record">New Record</Link>
            </li>
            <li>
              <div><SignOut /></div>
            </li>
          </ul>
        </div>
      </nav>
    );
}