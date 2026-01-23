# 🎬 Zig Movie App — Interview Coding Challenge (Step 1)

Candidate: Muziwakhe Wellington Zulu  
Role: Software Engineer  
Tech Stack: React + TypeScript (Client) | .NET 8 Web API (Server)

PLEASE REFER TO "ZIG MOVIE APP-technical documantation.pdf" for movie app technical and visual documentation

---

## 1. Project Overview

This repository contains a complete full-stack movie application built as **Step 1 of the Zig interview process**.

The application consumes data from **The Movie Database (TMDB)** API through a secure server-side Web API and presents it via a modern, responsive React frontend. The solution strictly follows the requirements provided in the challenge and includes several architectural and UX enhancements to demonstrate production-level engineering practices.

A **separate, detailed technical document** accompanies this repository and explains the system end-to-end, including architecture decisions, implementation details, and design rationale.

---

## 2. Key Features Implemented

### Required Features
- Homepage listing **Top 20 Popular Movies**
- Movie search by title
- Individual movie detail pages
- Server-side API abstraction over TMDB
- TypeScript-based client-side implementation
- Unit tests for controllers and repositories

### Additional Enhancements
- Trending movies slideshow
- Genre filtering
- Favorites system with persistence
- Dark / Light mode toggle
- Clean navigation and UI polish
- Repository pattern and service layer
- Singleton HttpClient
- Dependency Injection throughout backend
- Professional FAQ and Support pages

---

## 3. Application Architecture

The solution is intentionally split into **Client** and **Server** layers:

- **Client-side** (React + TypeScript): Handles UI, routing, state, and user interactions
- **Server-side** (.NET Web API): Handles all data access, business logic, and TMDB communication

The frontend **never communicates directly with TMDB**, ensuring security, scalability, and clean separation of concerns.

---

## 4. API Endpoints

The server exposes the following routes:

- `GET /api/popular`  
  Returns the top 20 most popular movies

- `GET /api/search?query=movieName`  
  Searches movies by title

- `GET /api/movie/{id}`  
  Retrieves a single movie by ID

All client-side data is retrieved exclusively through these endpoints.

---

---
## 5. How to Run the Project

### Server
bash

cd serverside

dotnet restore

dotnet run

### Client
cd clientside/zig-movie-app

npm install

npm start

---

## Extended Documentation

A full technical design and implementation document (PDF) was created
covering architecture decisions, data flow, UI/UX rationale, and testing
strategy. This document is included as part of the interview submission
materials.
