/**
 * ===============================================
 * PRUEBAS DE SERVICIOS - AXIOS (CÓDIGO REAL)
 * Proyecto: Numeris Astral - Frontend
 * ===============================================
 *
 * Estas pruebas ejecutan CÓDIGO REAL del proyecto
 * probando las funciones de servicios con mocks de axios.
 *
 * PRUEBAS REALES:
 * - GET, POST, PUT, DELETE
 * - Manejo de errores
 */

import { describe, test, expect, beforeEach, jest } from '@jest/globals';

// Mock del plugin axios
jest.mock('../../src/plugins/pluginAxios.js', () => {
  const mockAxiosInstance = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn()
  };
  return {
    __esModule: true,
    default: mockAxiosInstance
  };
});

import axiosInstance from '../../src/plugins/pluginAxios.js';
import { getData, postData, putData, deleteData } from '../../src/services/services';

describe('🧪 PRUEBAS DE SERVICIOS - CÓDIGO REAL', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ==================================================
  // 1. PRUEBA: GET DATA - ÉXITO
  // ==================================================
  test('Debe llamar a axios.get y retornar los datos', async () => {
    const mockData = { success: true, user: { name: 'Test User' } };
    axiosInstance.get.mockResolvedValue({ data: mockData });

    const result = await getData('/user/profile');

    expect(axiosInstance.get).toHaveBeenCalledWith('/user/profile');
    expect(result).toEqual(mockData);
  });

  // ==================================================
  // 2. PRUEBA: POST DATA - ÉXITO
  // ==================================================
  test('Debe llamar a axios.post y retornar los datos', async () => {
    const mockData = { success: true, id: '123' };
    const payload = { email: 'test@test.com', password: '123456' };
    axiosInstance.post.mockResolvedValue({ data: mockData });

    const result = await postData('/auth/login', payload);

    expect(axiosInstance.post).toHaveBeenCalledWith('/auth/login', payload);
    expect(result).toEqual(mockData);
  });

  // ==================================================
  // 3. PRUEBA: PUT DATA - ÉXITO
  // ==================================================
  test('Debe llamar a axios.put y retornar los datos', async () => {
    const mockData = { success: true, updated: true };
    const payload = { name: 'Updated Name' };
    axiosInstance.put.mockResolvedValue({ data: mockData });

    const result = await putData('/user/update', payload);

    expect(axiosInstance.put).toHaveBeenCalledWith('/user/update', payload);
    expect(result).toEqual(mockData);
  });

  // ==================================================
  // 4. PRUEBA: DELETE DATA - ÉXITO
  // ==================================================
  test('Debe llamar a axios.delete y retornar los datos', async () => {
    const mockData = { success: true, deleted: true };
    axiosInstance.delete.mockResolvedValue({ data: mockData });

    const result = await deleteData('/user/remove');

    expect(axiosInstance.delete).toHaveBeenCalledWith('/user/remove');
    expect(result).toEqual(mockData);
  });

  // ==================================================
  // 5. PRUEBA: GET DATA - ERROR
  // ==================================================
  test('Debe propagar el error cuando getData falla', async () => {
    const mockError = new Error('Network Error');
    axiosInstance.get.mockRejectedValue(mockError);

    await expect(getData('/user/profile')).rejects.toThrow('Network Error');
  });

  // ==================================================
  // 6. PRUEBA: POST DATA - ERROR
  // ==================================================
  test('Debe propagar el error cuando postData falla', async () => {
    const mockError = new Error('Server Error');
    axiosInstance.post.mockRejectedValue(mockError);

    await expect(postData('/auth/login', {})).rejects.toThrow('Server Error');
  });

  // ==================================================
  // 7. PRUEBA: PUT DATA - ERROR
  // ==================================================
  test('Debe propagar el error cuando putData falla', async () => {
    const mockError = new Error('Update Failed');
    axiosInstance.put.mockRejectedValue(mockError);

    await expect(putData('/user/update', {})).rejects.toThrow('Update Failed');
  });

  // ==================================================
  // 8. PRUEBA: DELETE DATA - ERROR
  // ==================================================
  test('Debe propagar el error cuando deleteData falla', async () => {
    const mockError = new Error('Delete Failed');
    axiosInstance.delete.mockRejectedValue(mockError);

    await expect(deleteData('/user/remove')).rejects.toThrow('Delete Failed');
  });
});
