import React from 'react';
import { Slot } from 'expo-router';
import 'expo-router/entry';
import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from '@/database/initializeDatabase';
import { PlanosProvider } from './PlanosContext';

export default function Layout() {
  return( 
    <PlanosProvider>
      <SQLiteProvider databaseName={'database.db'} onInit={initializeDatabase}>
        <Slot />
      </SQLiteProvider>
    </PlanosProvider>
  );
}
