import { AuthService } from '../../services/auth.service';
import { JwtService } from '../../services/jwt.service'; 
import { generateId } from '../../util/generateId';
import { genSaltSync, hashSync } from 'bcrypt';
import { db } from '../../util/db'; 
import logger from '../../util/logger'; 
import { describe, beforeEach, jest, it, expect} from '@jest/globals';


// Mock external dependencies to isolate the AuthService logic.
// This prevents the tests from hitting a real database, generating real JWTs, or logging to the console.
jest.mock('../../services/jwt.service');
jest.mock('../../util/generateId');
jest.mock('bcrypt');
jest.mock('../../util/db', () => ({
    dashboard_user: {
        create: jest.fn(),
    },
}));
jest.mock('../../util/logger', () => ({
    error: jest.fn(),
}));

describe('AuthService', () => {
    let authService: AuthService;
    let mockJwtService: jest.Mocked<JwtService>;

    // Define mock data to use in tests
    const mockSignupDto = {
        email: 'test@example.com',
        password: 'password123',
    };
    const mockUserId = 'mock-user-id-123';
    const mockAccessToken = 'mock-access-token';
    const mockRefreshToken = 'mock-refresh-token';

    // This block runs before each test case.
    // It's crucial for ensuring a clean state for every test.
    beforeEach(() => {
        // Reset all mocks to their initial state
        jest.clearAllMocks();

        // Instantiate the service. We must do this *after* the mocks are defined,
        // so the constructor uses our mocked dependencies.
        authService = new AuthService();
        
        // Get the mock instance of JwtService
        mockJwtService = new JwtService() as jest.Mocked<JwtService>;

        // Set up the mock implementations for the external functions
        (generateId as jest.Mock).mockReturnValue(mockUserId);
        (genSaltSync as jest.Mock).mockReturnValue('mock-salt');
        (hashSync as jest.Mock).mockReturnValue('mock-hashed-password');

        // Mock the JwtService sign method to return predictable values.
        mockJwtService.sign.mockReturnValueOnce(mockAccessToken).mockReturnValueOnce(mockRefreshToken);
    });

    // --- Test Cases ---

    it('should successfully sign up a new user and return tokens', async () => {
        // Arrange
        const mockUserCreated = {
            id: mockUserId,
            email: mockSignupDto.email,
            password: 'mock-hashed-password',
            createdAt: new Date(),
            updatedAt: new Date(),
            isLocked: 0,
            isNew: 1
        };

        // Mock the database call to resolve with a created user object
        (db.dashboard_user.create as jest.Mock).mockReturnValue(mockUserCreated);

        // Act
        const result = await authService.signup(mockSignupDto);

        // Assert
        // Verify that the database create function was called with the correct data
        expect(db.dashboard_user.create).toHaveBeenCalledTimes(1);
        expect(db.dashboard_user.create).toHaveBeenCalledWith({
            data: {
                id: mockUserId,
                email: mockSignupDto.email,
                password: 'mock-hashed-password',
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
                isLocked: 0,
                isNew: 1
            },
        });

        // Verify that the JWT service's sign method was called twice
        expect(mockJwtService.sign).toHaveBeenCalledTimes(2);

        // Verify that the sign method was called with the correct payload for both tokens
        const expectedPayload = { userId: mockUserCreated.id, email: mockUserCreated.email };
        expect(mockJwtService.sign).toHaveBeenCalledWith(expectedPayload);
        expect(mockJwtService.sign).toHaveBeenCalledWith(expectedPayload);

        // Verify the returned result is correct
        expect(result).toEqual({
            accessToken: mockAccessToken,
            refreshToken: mockRefreshToken,
        });
    });

    it('should throw an error if email is missing', async () => {
        // Arrange
        const invalidSignupDto = { ...mockSignupDto, email: undefined as any };

        // Act & Assert
        // We use `await expect(...).rejects.toThrow(...)` to test for thrown errors in async functions
        await expect(authService.signup(invalidSignupDto)).rejects.toThrow('Email and password are required');
        
        // Verify that the database function was not called
        expect(db.dashboard_user.create).not.toHaveBeenCalled();
        // Verify that the logger was called with the error
        expect(logger.error).toHaveBeenCalledWith('Email and password are required');
    });

    it('should throw an error if password is missing', async () => {
        // Arrange
        const invalidSignupDto = { ...mockSignupDto, password: undefined as any };

        // Act & Assert
        await expect(authService.signup(invalidSignupDto)).rejects.toThrow('Email and password are required');
        
        // Verify that the database function was not called
        expect(db.dashboard_user.create).not.toHaveBeenCalled();
        // Verify that the logger was called with the error
        expect(logger.error).toHaveBeenCalledWith('Email and password are required');
    });

    /* it('should throw an error and log the message on a database failure', async () => {
        // Arrange
        const dbError = new Error('Database connection failed');
        // Mock the database call to reject with a specific error
        (db.dashboard_user.create as jest.Mock).mockRejectedValue(dbError);

        // Act & Assert
        await expect(authService.signup(mockSignupDto)).rejects.toThrow('Error creating user');

        // Verify that the logger was called with the database error
        expect(logger.error).toHaveBeenCalledWith('Error creating user: ' + dbError + ' with email: ' + mockSignupDto.email);
    }); */
});