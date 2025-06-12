<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <title>Teez</title>
</head>
<body>
    <nav class="w-screen h-18 top-0 dark:text-white flex p-4 bg-white dark:bg-sidebar fixed shadow items-center text-black">
        {{-- <h1 class=" text-3xl font-black outline rounded-full p-2">TZ</h1> --}}
        <div class="h-20 w-20 bg-cover  bg-center" style="background-image: url('/storage/image/tea_icon.png')">
            {{--  --}}
        </div>
        <ul class="text-xl flex ml-auto flex-row justify-between gap-4">
            <li><a href="#" class="px-2 py-1 hover:bg-slate-200 transition-colors duration-150 rounded-lg">Home</a></li>
            <li><a href="#" class="px-2 py-1 hover:bg-slate-200 transition-colors duration-150 rounded-lg">About Us</a></li>
            <li><a href="#" class="px-2 py-1 hover:bg-slate-200 transition-colors duration-150 rounded-lg">Build</a></li>
        </ul>
        <div class="ml-auto">
            @auth
            <button class="px-4 py-2 cursor-pointer text-md bg-blue-500 text-white rounded-xl font-semibold ">Go to Dashboard</button>
            @else
            
            <button class="p-2 cursor-pointer text-md bg-blue-500/20 border-2  text-blue-500 rounded-xl font-semibold">Sign Up</button>
            <button class="p-2 cursor-pointer text-md bg-blue-500 text-white rounded-xl font-semibold">Sign In</button>
            @endauth
        </div>
    </nav>
    <main class="mt-18 mb-[50rem] ">
        {{ $slot }}
    </main>
    <footer class="w-full p-0 flex border-t-2">
        <p class="w-full text-[35rem] text-center mb-0 font-black">Teez</p>
    </footer>
</body>
</html>