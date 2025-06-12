<x-navbar> 
    <div class=" w-full h-[500px] flex  flex-row items items-center border-b-2 justify-center p-12">
        <h1 class="flex flex-col font-bold">
            <span class="text-5xl">Build Your Own Quiz</span>
            <span class="text-5xl">and Share it later</span>
            <p class="text-lg font-medium break-words w-full">
                Don't forget to drink your tea, <br>
                 and share your quiz to your friends
            </p>

            <div class="mt-2">
                <a class="px-4 py-2 cursor-pointer text-lg bg-blue-500 text-white rounded-xl font-semibold "href="{{ route("dashboard") }}">Build Now!</a>
                <a class="px-4 py-2 cursor-pointer text-lg bg-blue-500/20 border-2 text-blue-500 rounded-xl font-semibold" href="{{ route("dashboard") }}" > Get Your Tea</a>
            </div>
        </h1>
        <div class="h-64 w-64 ml-52 bg-cover scale-150 bg-center" style="background-image: url('/storage/image/tea_icon.png')">
            {{--  --}}
        </div>
    </div>

</x-navbar>